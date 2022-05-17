define( [
    'vue',
    'js/app/login/login',
    'vue-components-install',
    'vue-notification-install',
    'vue-js-modal-install',
], function ( Vue, App ) {
    return new Vue( {
        render: function ( h ) {
            return h( App );
        }
    } ).$mount( '#app' );
} );