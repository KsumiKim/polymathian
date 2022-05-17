define( [
    'text!./login.html',
    './modal/signup',
    'axios'
], function ( template, signup, axios ) {
    return {
        template: template,
        data: function () {
            return {
                user: {
                    p: '',
                    c: ''
                }
            };
        },
        methods: {
            login: function () {
                var user = this.user;
                axios.login( user.p, user.c )
                .then( function ( response ) {
                    if ( response.redirectUrl ) {
                        window.location.href = response.redirectUrl;
                    }
                } )
                .catch( function( error ) {
                    console.log(error);
                } );
            },
            signup: function () {
                var _this = this;

                this.$showModal( signup, {
                    menu: {},
                    callback: function( returnObj ) {
                        if ( returnObj.success ) {
                            _this.$notify.success('가입이 완료되었습니다. 로그인하세요.');
                        }
                    }
                }, { resizable: false } );
            }
        }
    };
} );