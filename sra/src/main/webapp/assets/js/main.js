define( [
    'vue',
    'js/app/main/main',
    'vuex-store-install',
    'mixins/session-mixin',
    'json!/auth/session',
    'vue-components-install',
    'vue-dialog-install',
    'vue-notification-install',
    'vue-js-modal-install',
    'bootstrap',
], function ( Vue, App, store, sessionMixin, session ) {
    return new Vue( {
        mixins: [ sessionMixin ],
        store: store,
        created: function () {
            this.registerSession( Object.freeze( session ) );
        },
        render: function ( h ) {
            return h( App );
        }
    } ).$mount( '#app' );
} );