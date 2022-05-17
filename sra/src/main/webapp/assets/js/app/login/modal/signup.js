define( [
    'text!./signup.html',
    'axios',
    'vue-notification-install',
], function ( template, axios ) {
    return {
        template: template,
        props: {
            callback: { type: Function, required: true }
        },
        modal: {
            width: 1000,
            height: 700
        },
        data: function () {
            return {
                user: {
                    userId: '',
                    userName: '',
                    password: '',
                    passwordConfirm: ''
                },
                thumbnail: []
            };
        },
        methods: {
            register: function () {
                var _this = this;

                if ( this.doValidate() ) {
                    axios.signup( this.user, this.thumbnail ).then( function() {
                        _this.callback({ success: true });
                        _this.$close();
                    } )
                }
            },
            openFileBrowser: function() {
                this.$refs.fileInput.click();
            },
            onFileChanged: function ( e ) {
                var _this = this;
                var thumbnail = e.target.files[0];
                var reader = new FileReader();

                reader.onload = function( e ) {
                    _this.$refs.thumbnail.src = e.target.result;
                }
                reader.readAsDataURL(thumbnail);
                this.thumbnail.push(thumbnail);
            },
            doValidate: function() {
                var keys = Object.keys( this.user );

                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (!this.user[key]) {
                        alert('필수 입력값 입니다.');
                        return false;
                    }
                }

                if ( this.user.password !== this.user.passwordConfirm ) {
                    alert('비밀번호와 비밀번호 확인 값이 같지 않습니다. 다시 확인하세요.');
                    return false;
                }

                if ( this.user.password === this.user.userId ) {
                    alert('비밀번호와 사용자 Id가 동일할 수 없습니다.');
                    return false;
                }

                return true;
            }
        }
    };
} );