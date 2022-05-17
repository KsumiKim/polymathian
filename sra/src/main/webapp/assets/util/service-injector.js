define( [], function () {
    var ARROW_ARG = /^([^(]+?)=>/;
    var FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    var $cache = {};
    function ServiceInjector () {}
    ServiceInjector.prototype.get = getService;
    ServiceInjector.prototype.register = registerService;
    ServiceInjector.prototype.invoke = function invoke ( fn, self, locals ) {
        var args = this.injectionArguments( fn, locals );
        return fn.apply( self, args );
    };
    ServiceInjector.prototype.injectionArguments = function injectionArguments ( fn, locals ) {
        locals = locals || {};
        var inject = extractArgs( fn );
        return inject.map( function ( serviceName ) {
            var service = getService( serviceName ) || locals[ serviceName ];
            if ( !service ) {
                throw new Error( '"' + serviceName + '"와 일치하는 서비스는 등록되지 않았습니다.' );
            }
            return service;
        } );
    };

    function getService ( name ) {
        return $cache[ name ];
    }

    function registerService ( name, service ) {
        $cache[ name ] = service;
    }

    function stringifyFn ( fn ) {
        return Function.prototype.toString.call( fn );
    }

    function extractArgs ( fn ) {
        var injectionNameArgs = [];
        var fnText = stringifyFn( fn ).replace( STRIP_COMMENTS, '' );
        var args = fnText.match( ARROW_ARG ) || fnText.match( FN_ARGS );
        args[ 1 ].split( FN_ARG_SPLIT ).forEach( function ( arg ) {
            arg.replace( FN_ARG, function ( _, _, name ) {
                injectionNameArgs.push( name );
            } );
        } );
        return injectionNameArgs;
    }
    return new ServiceInjector();
} );