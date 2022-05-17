define( [
    'mixins/proxyable-mixin-factory'
], function ( proxyableMixinFactory ) {
    return {
        mixins: [ proxyableMixinFactory() ],
        props: {
            activeClass: {
                type: String,
                default: 'v-item--active'
            },
            mandatory: Boolean,
            max: {
                type: [ Number, String ],
                default: null
            },
            multiple: Boolean
        },
        data: function () {
            return {
                internalLazyValue: this.value !== undefined ? this.value : this.multiple ? [] : undefined,
                items: []
            };
        },
        computed: {
            classes: function () {
                return {
                    'v-item-group': true
                };
            },
            selectedIndex: function () {
                return this.selectedItem && this.items.indexOf( this.selectedItem ) || -1;
            },
            selectedItem: function () {
                if ( this.multiple ) {
                    return undefined;
                }
                return this.selectedItems[ 0 ];
            },
            selectedItems: function () {
                var _this = this;

                return this.items.filter(function (item, index) {
                    return _this.toggleMethod(_this.getValue(item, index));
                });
            },
            selectedValues: function () {
                if ( this.internalValue == null ) {
                    return [];
                }
                return Array.isArray( this.internalValue ) ? this.internalValue : [ this.internalValue ];
            },
            toggleMethod: function () {
                var _this = this;
                if ( !this.multiple ) {
                    return function ( v ) {
                        return _this.internalValue === v;
                    };
                }
                var internalValue = this.internalValue;
                if ( Array.isArray( internalValue ) ) {
                    return function ( v ) {
                        return internalValue.includes( v );
                    };
                }
                return function () {
                    return false;
                };
            }
        },
        watch: {
            internalValue: 'updateItemsState',
            items: 'updateItemsState'
        },
        methods: {
            genData: function () {
                return {
                    class: this.classes
                };
            },
            getValue: function ( item, i ) {
                return item.value == null || item.value === '' ? i : item.value;
            },
            onClick: function ( item ) {
                this.updateInternalValue( this.getValue( item, this.items.indexOf( item ) ) );
            },
            register: function ( item ) {
                var _this = this;
                var index = this.items.push( item ) - 1;
                item.$on( 'change', function () {
                    return _this.onClick( item );
                } );

                if ( this.mandatory && !this.selectedValues.length ) {
                    this.updateMandatory();
                }
                this.updateItem( item, index );
            },
            unregister: function ( item ) {
                if ( this._isDestroyed ) {
                    return;
                }
                var index = this.items.indexOf( item );
                var value = this.getValue( item, index );
                this.items.splice( index, 1 );
                var valueIndex = this.selectedValues.indexOf( value );

                if ( valueIndex < 0 ) {
                    return;
                }

                if ( !this.mandatory ) {
                    return this.updateInternalValue( value );
                }

                if ( this.multiple && Array.isArray( this.internalValue ) ) {
                    this.internalValue = this.internalValue.filter( function ( v ) {
                        return v !== value;
                    } );
                } else {
                    this.internalValue = undefined;
                }

                if ( !this.selectedItems.length ) {
                    this.updateMandatory( true );
                }
            },
            updateItem: function ( item, index ) {
                var value = this.getValue( item, index );
                item.isActive = this.toggleMethod( value );
            },
            updateItemsState: function () {
                var _this = this;
                this.$nextTick(function () {
                    if ( _this.mandatory && !_this.selectedItems.length ) {
                        return _this.updateMandatory();
                    }
                    _this.items.forEach( _this.updateItem );
                } );
            },
            updateInternalValue: function ( value ) {
                this.multiple ? this.updateMultiple( value ) : this.updateSingle( value );
            },
            updateMandatory: function ( last ) {
                if (!this.items.length) {
                    return;
                }
                var items = this.items.slice();

                if ( last ) {
                    items.reverse();
                }
                var item = items.find( function ( item ) {
                    return !item.disabled;
                } );

                if ( !item ) {
                    return;
                }
                var index = this.items.indexOf( item );
                this.updateInternalValue( this.getValue( item, index ) );
            },
            updateMultiple: function ( value ) {
                var defaultValue = Array.isArray( this.internalValue ) ? this.internalValue : [];
                var internalValue = defaultValue.slice();
                var index = internalValue.findIndex( function ( val ) {
                    return val === value;
                } );

                if ( this.mandatory && index > -1 && internalValue.length - 1 < 1 ) {
                    return;
                }

                if ( this.max != null &&  index < 0 && internalValue.length + 1 > this.max ) {
                    return;
                }
                index > -1 ? internalValue.splice( index, 1 ) : internalValue.push( value );
                this.internalValue = internalValue;
            },
            updateSingle: function updateSingle ( value ) {
                var isSame = value === this.internalValue;
                if ( this.mandatory && isSame ) {
                    return;
                }
                // this.internalValue = isSame ? undefined : value;
                if ( !isSame ) {
                    this.internalValue = value;
                }
            }
        },
        render: function ( h ) {
            return h( 'div', this.genData(), this.$slots.default );
        }
    };
} );