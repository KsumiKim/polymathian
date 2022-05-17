define( [], function () {
    function VueAsyncComponentFactory ( normalize ) {
        this.normalize = normalize;
    }
    VueAsyncComponentFactory.prototype.create = function create ( url, proxy ) {
        var normalUrl = this.normalize( url );
        return function factory () {
            return {
                component: new Promise( function ( resolve ) {
                    require( [ normalUrl ], function ( component ) {
                        resolve( isFunction( proxy ) ? proxy( component ) : component );
                    } );
                } )

                // component: new Promise( function ( resolve ) {
                //     require( [ normalUrl ], resolve );
                // } )
            };
        };
    };
    return VueAsyncComponentFactory;

    function isFunction ( value ) { return typeof value === 'function'; }
} );