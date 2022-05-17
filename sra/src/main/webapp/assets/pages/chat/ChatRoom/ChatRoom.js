define( [
    'mixins/session-mixin',
    'text!./ChatRoom.html',
    './ChatRoomApi',
    'vuex-map-util',
    'js-joda'
], function ( sessionMixin, template, http, vuexMapUtil, JSJoda ) {
    var LocalDate = JSJoda.LocalDate;
    return {
        template: template,
        mixins: [ sessionMixin ],
        data: function() {
            return {
                userList: [],

                chatRoom: {},
                inputMsg: '',
                // chatHistories: new Map(),
                histories: [],
                chatStarted: false,
                selectedUser: null,
                file: [],
                isShowBrowser: false
            }
        },
        computed: vuexMapUtil.mapGetters( {
            stompClient: 'stompClient',
            chatContent: 'chatContent',
            chatHistories: 'chatHistories',
            chatUser: 'chatUser'
        }, {
            userId: function() {
                return this.session.userId;
            },
            userName: function() {
                return this.session.userName;
            },
            thumbnail: function() {
                return this.session.thumbnail;
            }
        } ),
        watch: {
            chatContent: function() {
                var deliveredMsg = this.chatContent;

                console.log(deliveredMsg);

                if ( deliveredMsg.isFile ) {
                    this.chatRoom.roomId = deliveredMsg.header['x-content-roomId'];
                    this.chatStarted = true;
                    this.selectedUser.userId = deliveredMsg.header['x-content-writer'];

                    if ( this.chatHistories.has( this.chatRoom.roomId ) ) {
                        this.chatHistories.get( this.chatRoom.roomId ).push( deliveredMsg );
                    } else {
                        this.chatHistories.set( this.chatRoom.roomId, [ deliveredMsg ] );
                        var inviterIdx = this.getUserIdx( deliveredMsg.header['x-content-writer'] );
                        this.$set( this.userList[ inviterIdx ], 'roomId', this.chatRoom.roomId );
                    }

                    this.histories.push( deliveredMsg );
                    return;
                }

                this.chatRoom.roomId = this.chatRoom.roomId ? this.chatRoom.roomId : deliveredMsg.roomId;
                this.chatStarted = true;
                this.selectedUser = deliveredMsg.writer;

                this.histories.push( deliveredMsg );
                var inviterIdx = this.getUserIdx( deliveredMsg.writerId );
                this.$set( this.userList[ inviterIdx ], 'roomId', deliveredMsg.roomId );

                if ( this.chatRoom.roomId !== deliveredMsg.roomId ) {
                    var inviterIdx = this.getUserIdx( deliveredMsg.writer.userId );
                    var unreadMsgCount = this.userList[ inviterIdx ].unreadMsgCount ? ++this.userList[ inviterIdx ].unreadMsgCount : 1;
                    this.$set( this.userList[ inviterIdx ], 'unreadMsgCount', unreadMsgCount );
                }
            },
            chatUser: function( chatUser ) {
                var userIdx = this.getUserIdx( chatUser.userId );
                this.userList[ userIdx ].status = chatUser.status
            },
            chatHistories: function() {
                if ( this.histories.length > 0 ) {
                    return;
                }
                this.histories = this.chatHistories;
            }
        },
        mounted: function () {
            this.selectUserList();
        },
        methods: vuexMapUtil.map( {
            mutations: {
                registerRoom: 'ROOM-REGISTER',
                updateChatContent: 'CHAT-CONTENT-UPDATE'
            }
        }, {
            send: function() {
                var body = JSON.stringify({
                    message: this.inputMsg,
                    writerId: this.userId,
                    writerNm: this.userName,
                    receiverId: this.selectedUser.userId,
                    receiverNm: this.selectedUser.userName,
                    roomId: this.chatRoom.roomId,
                    receiver: this.selectedUser,
                    writer: {
                        userId: this.userId,
                        userName: this.userName
                    },
                    createdAt: this.formatTime()
                });

                this.stompClient.publish({
                    destination: '/app/topic/' + this.chatRoom.roomId,
                    body: body
                });
                this.inputMsg = '';
                this.scrollToBottom();
            },
            scrollToBottom: function() {
                var scrollHeight = this.$refs.chatList.scrollHeight;
                this.$refs.chatContent.scrollTop = scrollHeight + 100;
            },
            startChat: function( selectedUser ) {
                var self = this;
                self.selectedUser = selectedUser;

                var chatUsers = {
                    writerId: this.userId,
                    receiverId: selectedUser.userId
                };

                http.selectChatRoom( chatUsers ).then( function( chatRoom ) {
                    self.chatRoom = chatRoom;

                    http.selectChatHistories( chatRoom ).then( function( chatHistories ) {
                        self.histories = chatHistories;
                        self.startSubscription();

                        // self.stompClient.publish({
                        //     destination: '/app/topic/private-message-' + selectedUser.userId,
                        //     body: JSON.stringify({
                        //         message: self.chatRoom.roomId,
                        //         writer: {
                        //             userId: self.userId,
                        //             userName: self.userName
                        //         },
                        //         receiver: {
                        //             userId: self.selectedUser.userId,
                        //             userName: self.selectedUser.userNames,
                        //             status: self.selectedUser.status,
                        //         },
                        //         chatHistories: chatHistories
                        //     })
                        // });

                        self.chatStarted = true;

                        var userIdx = self.getUserIdx( self.selectedUser.userId );
                        self.userList[ userIdx ].unreadMsgCount = 0;
                    } );
                } );
            },
            startSubscription: function() {
                var self = this;
                var binaryResult = new Uint8Array([]);

                this.stompClient.subscribe('/topic/' + this.chatRoom.roomId, function ( message ) {

                    if ( self.isFile( message.headers ) ) {
                        var mergedArr = new Uint8Array( binaryResult.byteLength + message.binaryBody.byteLength );
                        mergedArr.set( binaryResult, 0 );
                        mergedArr.set( message.binaryBody, binaryResult.byteLength );
                        binaryResult = mergedArr;

                        if ( message.headers['x-content-finish'] === 'end' ) {
                            var fileContent = new Blob( [ binaryResult ] );

                            var receivedFile = {
                                isFile: true,
                                download: download,
                                fileContent: fileContent,
                                header: message.headers,
                            };
                            self.histories.push( receivedFile );
                            binaryResult = new Uint8Array([]);
                            return;
                        }
                    } else {
                        var content = JSON.parse( message.body );
                        self.histories.push( content );
                    }
                });
            },
            selectUserList: function() {
                var self = this;
                http.selectUserList().then( function( userList ) {
                    self.userList = userList;
                } );
            },
            getUserIdx: function( targetUserId ) {
                return this.userList.findIndex( function( user ) {
                    return user.userId === targetUserId;
                } );
            },
            formatTime: function() {
                var dateObj = new Date();
                var hour = dateObj.getHours();
                var minute = dateObj.getMinutes();

                return hour + ':' + ( minute < 10 ? '0' + minute : minute)
            },
            getUserThumbnail: function( userId ) {
                if ( userId === this.userId ) {
                    return this.thumbnail ? 'data:image/png;base64, ' + this.thumbnail : '/assets/img/defaultThumbnail.png';
                }
                var userIdx = this.getUserIdx( userId );
                var user = this.userList[ userIdx ];
                                        // show defaultThumbnail image if selected user doesn't have thumbnail
                return user.hasOwnProperty( 'thumbnail' ) ? 'data:image/png;base64, ' + user.thumbnail : '/assets/img/defaultThumbnail.png';
            },
            onFileChange: function(e) {
                var file       = e.target.files[0]
                var CHUNK_SIZE = 61440;
                var offset     = 0;
                var self       = this;
                var reader     = new FileReader();
                var chunkCnt   = Math.ceil( file.size / CHUNK_SIZE );
                this.file      = file;

                reader.onload = function(evt) {

                    if (evt.target.error == null) {
                        offset += CHUNK_SIZE;
                        chunkCnt--;
                        var binaryData = new Uint8Array( evt.target.result );

                        console.log( binaryData );

                        self.stompClient.publish({
                            destination: '/topic/' + self.chatRoom.roomId,
                            binaryBody: binaryData,
                            headers: {
                                'content-type': 'application/octet-stream',
                                'x-content-finish': chunkCnt > 0 ? 'sending' : 'end',
                                'x-content-name': file.name,
                                'x-content-writer': self.userId,
                                'x-content-receiver': self.selectedUser.userId,
                                'x-content-roomId': self.chatRoom.roomId,
                                'x-content-createdAt': self.formatTime(),
                            }
                        });
                    }
                    seek();
                };
                reader.onerror = function(e) {
                    console.log(e);
                };
                seek();

                function seek() {
                    if (offset >= file.size) {
                        return;
                    }
                    var slice = file.slice(offset, offset + CHUNK_SIZE);
                    reader.readAsArrayBuffer(slice);
                }
            },
            openFileBrowser: function() {
                this.$refs.fileInput.click();
            },
            isFile: function( headers ) {
                return headers['content-type'] == 'application/octet-stream';
            }
        } )
    }
} );

function download (filename, blob){ // content: blob, name: string
    if (navigator.msSaveBlob) { // For ie and Edge
        return navigator.msSaveBlob(blob, filename);
    } else {
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
        link.remove();
        window.URL.revokeObjectURL(link.href);
    }
}