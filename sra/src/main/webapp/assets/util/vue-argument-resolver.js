define( [
    'mixins/proxyable-mdi-mixin',
    'mixins/proxyable-modal-mixin',
    'util/service-injector',
    'axios'
], function ( proxyableMdiMixin, proxyableModalMixin, serviceInjector, axios ) {
    return {
        resolve: enforceReconstruction
    };

    function enforceReconstruction ( component, isModal ) {
        if ( component.$$proxy ) {
            return component;
        }

        var mixin = isModal ? proxyableModalMixin : proxyableMdiMixin;
        if ( Array.isArray( component.mixins ) ) {
            component.mixins.push( mixin );
        } else {
            component.mixins = [ mixin ];
        }

        if ( isFunction( component.mounted ) ) {
            var lazyMounted = component.mounted;
            var codeProvide = component.code;
            component.mounted = function () {
                var _this = this;
                var locals = {};
                var executable = function () {
                    serviceInjector.invoke( lazyMounted, _this, locals );
                };

                if ( isFunction( codeProvide ) ) {
                    var codeDef = codeProvide() || {};
                    if ( !isEmptyObject( codeDef ) ) {
                        var lazyExecutable = executable;
                        executable = function () {
                            axios.code( codeDef ).then( function ( results ) {
                                Object.assign( locals, results );
                            } ).then( lazyExecutable );
                        }
                    }
                }
                executable();
            };
        }
        component.$$proxy = true;
        return component;
    }

    function isEmptyObject ( obj ) { var name; for ( name in obj ) { return false; } return true; }
    function isFunction ( value ) { return typeof value === 'function'; }
} );