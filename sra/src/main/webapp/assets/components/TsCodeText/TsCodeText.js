define( [
    '../TsText/TsText'
], function ( TsText ) {
    return {
        name: 'ts-code-text',
        mixins: [ TsText ],
        props: {
            appendIcon: { default: 'search' },
            itemName: { type: String, default: 'cdNm' },
            itemValue: { type: String, default: 'cd' },
            component: Object
        },
        data: function () {
            return {
                returnObject: null
            };
        },
        computed: {
            labelText: function () {
                return isObject( this.returnObject ) ? this.returnObject[ this.itemName ] : '';
            }
        },
        watch: {
            returnObject: function ( value ) {
                this.internalValue = isObject( value ) ? value[ this.itemValue ] : '';
            }
        },
        methods: {
            /** @abstract */
            getComponent: function () {},
            /** @public */
            update: function ( data ) {
                this.returnObject = data;
            },
            /** @override */
            genContent: function () {
                return [ this.genPrependSlot(), this.genText(), this.genAppendSlot(), this.genLabel() ];
            },
            genLabel: function () {
                return this.$createElement( 'label', {
                    staticClass: 'input-group-text justify-content-center bg-transparent',
                    style: {
                        'min-width': '30%'
                    }
                }, [ this.labelText ] );
            },
            genIcon: function () {
                var _this = this;
                var icon = TsText.methods.genIcon.apply( this, arguments );
                var fn = function () {
                    _this.showModal();
                }

                if ( icon.data.on ) {
                    icon.data.on[ 'click' ] = fn;
                } else {
                    icon.data.on = { 'click': fn };
                }
                return icon;
            },
            showModal: function ( componentProps, modalProps, modalEvents ) {
                var _this = this;
                componentProps = Object.assign( {}, componentProps, {
                    menu: {},
                    update: _this.update.bind( _this )
                } );
                var component = this.component;
                if ( !component ) {
                    component = this.getComponent();
                }
                this.$showModal( component, componentProps, modalProps, modalEvents );
            }
        }
    };

    function isObject ( v ) { return typeof v === 'object' && v !== null; }
} );