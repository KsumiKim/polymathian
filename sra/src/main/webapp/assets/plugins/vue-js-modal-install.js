define( [
    'vue',
    'vue-js-modal',
    'util/vue-argument-resolver',
    'components/TsConfirm/TsConfirm'
], function ( Vue, VModal, vueArgumentResolver, TsConfirm ) {
    Vue.use( VModal.default, {
        dynamicDefaults: {
            draggable: '.vue-js-modal-draggable',
            clickToClose: false,
            width: 500,
            height: 500,
            minWidth: 500,
            minHeight: 500,
            resizable: true
        }
    } );

    Vue.prototype.$showModal = function ( component, componentProps, modalProps, modalEvents ) {
        if ( isObject( component ) ) {
            componentProps = Object.assign( { menu: this.menu }, componentProps );
            modalProps = Object.assign( {}, modalProps, component.modal );
            return this.$modal.show( vueArgumentResolver.resolve( component, true ), componentProps, modalProps, modalEvents );
        }
    };

    Vue.prototype.$confirm = function ( componentProps, modalProps ) {
        this.$modal.show( TsConfirm, componentProps, Object.assign( {
            width: 300,
            height: 200
        }, modalProps ) );
    };

    function isObject ( v ) { return typeof v === 'object' && v !== null; }
} );