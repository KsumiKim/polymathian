define( [
    'vue-async-component-factory',
    'util/vue-argument-resolver'
], function ( VueAsyncComponentFactory, vueArgumentResolver ) {
    var rlastpath = /.+(\/.+)\/?$/;
    var factory = new VueAsyncComponentFactory( function normalize ( url ) {
        var prefix = 'pages' + url;
        var lastPath = url.replace( rlastpath, '$1' );
        return prefix + lastPath;
    } );
    return {
        provide: function provide ( url ) {
            return factory.create( url, proxy );
        }
    };

    function proxy ( component ) {
        return vueArgumentResolver.resolve( component, false );
    }
} );