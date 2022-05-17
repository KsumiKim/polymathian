define( [
    'vue'
], function ( Vue ) {
    var Module = {
        install: function ( Vue ) {
            var bus = new Vue( { name: 'dialog-bus' } );
        }
    };
    Vue.use( Module );
} );