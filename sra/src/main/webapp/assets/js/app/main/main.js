define( [
    'mixins/session-mixin',
    'text!./main.html',
    'json!/auth/menuList',
    'vuex-map-util',
    'axios',
    'StompJs'
], function ( sessionMixin, template, menuList, vuexMapUtil, axios, StompJs ) {
    var Stomp = StompJs.Stomp;
    return {
        template: template,
        mixins: [ sessionMixin ],
        data: function () {
            var xss = '<button onclick=&quot;javascript:sumi()">해킹</button>';
            return {
                landingPage: {
                    name: 'HOME',
                    navigation: 'HOME',
                    src: '/home/LandingPage',
                    buttons: [],
                    activated: true
                },

                menuList: menuList,
                isShowMenu: false,
                loading: false,
                files: [],
                file: null,
                fileSocket: {},
                client: null,
                binaryResult: new Uint8Array([])
            };
        },
        computed: vuexMapUtil.mapGetters( {
            menuMap: 'menuMap',
            rooms: 'rooms'
        }, {
            username: function () {
                return this.session.userId;
            },
            wsUrl: function() {
                return window.mode === 'prod' ? 'ws://www.polymathian.me:80/polymathian/ws/' : 'ws://localhost:81/polymathian/ws/';
            }
        } ),
        created: function () {
            var _this = this;
            var userId = this.session.userId;

            axios.setLoadingFunction( function ( isTransaction ) {
                _this.loading = isTransaction;
            } );
            axios.setNotifyFunction( function ( message ) {
                _this.$notify.error( message );
            } );

            var client = Stomp.over(function() {
                return new WebSocket(_this.wsUrl);
            });
            this.client = client;
            client.heartbeatIncoming = 100000;
            client.heartbeatOutgoing = 100000;
            this.registerStompClient( client );

            client.onConnect = function () {

                client.subscribe('/topic/status', function (message) {
                    var user = JSON.parse(message.body);

                    if ( user.userId !== userId ) {
                        _this.updateUserStatus( user );

                        if ( user.status === 'CONNECT' ) {
                            _this.$notify.warn( user.userId + ' 님이 로그인했습니다.' );
                        }
                    } else {
                        _this.status = user.status;
                    }
                });
                client.publish({
                    destination: '/app/topic/status',
                    body: JSON.stringify('CONNECT')
                });
                client.subscribe("/topic/private-message-" + _this.username, function (chat) {
                    var content = JSON.parse( chat.body );
                    _this.updateChatHistories( content.chatHistories );

                    client.subscribe( '/topic/' + content.message, function( message ) {

                        console.log( message );

                        if ( _this.isFile( message.headers ) ) {

                            var mergedArr = new Uint8Array(_this.binaryResult.byteLength + message.binaryBody.byteLength);
                            mergedArr.set( _this.binaryResult, 0 );
                            mergedArr.set( message.binaryBody, _this.binaryResult.byteLength );
                            _this.binaryResult = mergedArr;

                            if (message.headers["x-content-finish"] === 'end' ) {
                                var fileContent = new Blob( [ _this.binaryResult ] );

                                var receivedFile = {
                                    isFile: true,
                                    download: download,
                                    fileContent: fileContent,
                                    header: message.headers,
                                };
                                _this.updateChatContent( receivedFile );
                                _this.binaryResult = new Uint8Array([]);
                                return;
                            }
                        } else {
                            var result = JSON.parse( message.body );
                            _this.updateChatContent( result );
                        }
                    } );
                });
            };
            client.activate();
        },
        mounted: function () {
            var workMenuList = this.menuList.flatMap( function flatternFilter ( m ) {
                return Array.isArray( m.children )
                    ? m.children.flatMap( flatternFilter )
                    : [ m ];
            } ).filter( function ( m ) {
                return !!m.src;
            } );
            this.saveMenuList( workMenuList );
            this.attachMenu( this.landingPage );

            var _this = this;

            // var TIMEOUT = 600; //seconds
            // var timer = 0;
            // document.onclick = function() {
            //     timer = 0;
            //     resetStatus();
            // };
            // document.onmousemove = function() {
            //     timer = 0;
            //     resetStatus();
            // };
            // document.onkeydown = function() {
            //     timer = 0;
            //     resetStatus();
            // };
            // window.setInterval(checkIdleTime, 1000);

            // function checkIdleTime() {
            //     timer++;

            //     if ( timer >= TIMEOUT && _this.status !== 'SLEEP' ) {
            //         _this.stompClient.send('/app/topic/status', {}, JSON.stringify('SLEEP'));
            //         console.log( _this.status );
            //         timer = 0;
            //     }
            // }

            // function resetStatus() {
            //     if ( _this.status === 'SLEEP' ) {
            //         _this.stompClient.send('/app/topic/status', {}, JSON.stringify('CONNECT'));
            //     }
            // }
        },
        methods: vuexMapUtil.map( {
            mutations: {
                saveMenuList: 'MENU-SAVE-LIST',
                registerStompClient: 'STOMPCLIENT-REGISTER',
                updateChatContent: 'CHAT-CONTENT-UPDATE',
                updateChatHistories: 'CHAT-HISTORIES-UPDATE',
                updateUserStatus: 'USER-STATUS-UPDATE'
            },
            actions: {
                attachMenu: 'MENU-ATTACH-ACTIVE'
            }
        }, {
            onFileChange: function(e) {
                var CHUNK_SIZE = 65416;
                var file       = e.target.files[0];
                this.file      = file;
                var offset     = 0;
                var client     = this.client;
                var reader     = new FileReader();
                var chunkCnt   = Math.ceil( file.size / CHUNK_SIZE );

                reader.onload = function(evt) {

                    if (evt.target.error == null) {
                        offset += CHUNK_SIZE;
                        chunkCnt--;
                        var binaryData = new Uint8Array( evt.target.result );

                        client.publish({
                            destination: '/topic/filesooom',
                            binaryBody: binaryData,
                            headers: {
                                'content-type': 'application/octet-stream',
                                'x-content-finish': chunkCnt > 0 ? 'sending' : 'end'
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
            openMenu: function ( menu ) {
                this.attachMenu( menu );
                this.isShowMenu = false;
            },
            isFile: function( headers ) {
                return headers['content-type'] == 'application/octet-stream';
            }
        } )
    };

    function download (filename, blob) { // content: blob, name: string
        if(navigator.msSaveBlob){ // For ie and Edge
            return navigator.msSaveBlob(blob, filename);
        }
        else{
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
            link.remove();
            window.URL.revokeObjectURL(link.href);
        }
    }
} );