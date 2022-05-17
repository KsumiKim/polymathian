define( [], function () {
    return {
        data: function () {
            return {
                attrs$: {},
                listeners$: {}
            };
        },
        created: function () {
            this.$watch( '$attrs', makeWatcher( 'attrs$' ), {
                immediate: true
            } );
            this.$watch( '$listeners', makeWatcher( 'listeners$' ), {
                immediate: true
            } );
        }
    };

    function makeWatcher ( property ) {
        return function ( val, oldVal ) {
            for ( var attr in oldVal ) {
                if ( !Object.prototype.hasOwnProperty.call( val, attr ) ) {
                this.$delete( this.$data[ property ], attr );
                }
            }

            for ( var attr in val ) {
                this.$set( this.$data[ property ], attr, val[ attr ] );
            }
        };
    }
} );