define( [
    'vue',
    'vue-notification'
], function ( Vue, Notifications ) {
    var Module = {
        install: function ( Vue ) {
            var notifyGlobal = function ( type, title, message ) {
                Vue.notify( {
                    group: 'global', type: type,
                    title: title, text: message,
                    duration: type === 'error' ? -1 : 2500,
                    closeOnClick: false
                } );
            };
            var notifyModal = function ( type, title, message ) {
                Vue.notify( {
                    group: 'modal', type: type,
                    title: title, text: message,
                    duration: type === 'error' ? -1 : 2500,
                    closeOnClick: false
                } );
            };
            var $notify = {
                success: function ( message, title ) { notifyGlobal( 'success', title, message ); },
                warn: function ( message, title ) { notifyGlobal( 'warn', title, message ); },
                error: function ( message, title ) { notifyGlobal( 'error', title, message ); }
            };
            var $notifyModal = {
                success: function ( message, title ) { notifyModal( 'success', title, message ); },
                warn: function ( message, title ) { notifyModal( 'warn', title, message ); },
                error: function ( message, title ) { notifyModal( 'error', title, message ); }
            };
            Vue.prototype.$notify = $notify;
            Vue.prototype.$notifyModal = $notifyModal;
        }
    };
    Vue.use( Notifications.default );
    Vue.use( Module );
} );