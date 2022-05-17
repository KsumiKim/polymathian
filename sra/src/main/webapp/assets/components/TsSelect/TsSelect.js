define( [
    'mixins/input-mixin',
    'mixins/sizeable-mixin',
    '../TsBtn/TsBtn'
], function ( inputMixin, sizeableMixin, TsBtn ) {
    return {
        name: 'ts-select',
        mixins: [ inputMixin, sizeableMixin ],
        props: {
            block: Boolean,
            color: String,
            outlined: Boolean,
            value: { required: false },
            items: { type: Array, default: function () { return []; } },
            itemText: { type: String, default: 'name' },
            itemValue: { type: String, default: 'value' },
            nullable: Boolean,
            nullText: { type: String, default: '선택' },
            nullValue: { type: String, default: null },
            multiple: Boolean,
            returnObject: Boolean
        },
        data: function () {
            return {
                lazyValue: this.value !== undefined ? this.value : this.multiple ? [] : undefined,
                lazyItems: [],
                selectedItems: []
            };
        },
        watch: {
            value: function ( val ) {
                this.internalValue = val;
            },
            internalValue: function () {
                this.setSelectedItems();
            },
            items: {
                immediate: true,
                handler: function ( items ) {
                    this.internalItems = items;
                    this.setSelectedItems();
                }
            }
        },
        computed: {
            computedSelectionCommaText: function () {
                var _this = this;
                return this.selectedItems.map( function ( item ) {
                    return _this.getText( item );
                } ).join( ', ' ) || '선택';
            },
            internalValue: {
                get: function get () {
                  return this.lazyValue;
                },
                set: function set ( val ) {
                    if ( this.lazyValue !== val ) {
                        this.lazyValue = val;
                        this.$emit( 'input', this.lazyValue );
                    }
                }
            },
            internalItems: {
                get: function () {
                    return this.lazyItems;
                },
                set: function ( items ) {
                    items = Array.prototype.slice.call( items, 0 );
                    if ( this.nullable ) {
                        var nullItem = {};
                        nullItem[ this.itemText ] = this.nullText;
                        nullItem[ this.itemValue ] = this.nullValue;
                        items.unshift( nullItem );
                    }
                    this.lazyItems = items;
                }
            }
        },
        created: function () {
            this.internalItems = this.items;
        },
        methods: {
            genButton: function () {
                return this.$createElement( TsBtn, {
                    staticClass: 'ts-select-btn dropdown-toggle text-truncate',
                    props: {
                        block: this.block,
                        sm: this.sm,
                        lg: this.lg,
                        color: this.color,
                        outlined: this.outlined,
                        disabled: this.isDisabled,
                        type: 'button'
                    },
                    attrs: {
                        'data-toggle': 'dropdown',
                        'aria-expanded': 'false',
                        tabindex: this.isDisabled ? -1 : this.tabindex,
                        autofocus: this.autofocus
                    },
                    ref: 'dropdown'
                }, [ this.computedSelectionCommaText ] )
            },
            genItem: function ( h, item, isActive ) {
                return h( 'a', {
                    class: {
                        'ts-select-item-link': true,
                        'ts-select-item-link--active': isActive,
                        'dropdown-item': true,
                        active: isActive
                    }
                }, [ this.getText( item ) ] );
            },
            genItems: function ( h ) {
                var _this = this;
                var multiple = this.multiple;
                return this.internalItems.map( function ( item, index ) {
                    var isActive;
                    if ( Array.isArray( _this.internalValue ) ) {
                        isActive = _this.findExistingIndex( item ) !== -1;
                    } else {
                        isActive = _this.getValue( item ) === ( _this.returnObject ? _this.getValue( _this.internalValue ) : _this.internalValue );
                    }
                    return h( 'li', {
                        staticClass: 'ts-select-item',
                        class: {
                            'ts-select-item--active': isActive,
                        },
                        on: {
                            click: function ( e ) {
                                if ( multiple ) {
                                    e.stopPropagation();
                                }
                                e.preventDefault();
                                return _this.selectItem( item );
                            }
                        },
                        key: index
                    }, [ _this.genItem( h, item, isActive ) ] );
                } );
            },
            genItemControl: function ( h ) {
                var _this = this;
                var selectAll = h( TsBtn, {
                    props: {
                        outlined: true,
                        color: 'secondary'
                    },
                    on: {
                        click: function () {
                            _this.internalValue = _this.items.slice();
                        }
                    }
                }, [ '전체선택' ] );
                var unselectAll = h( TsBtn, {
                    props: {
                        outlined: true,
                        color: 'secondary'
                    },
                    on: {
                        click: function () {
                            _this.internalValue = [];
                        }
                    }
                }, [ '전체해제' ] );
                return h( 'div', {
                    staticClass: 'btn-group d-flex justify-content-center px-2 pb-2',
                    on: {
                        click: function ( e ) {
                            e.stopPropagation();
                        }
                    }
                }, [ selectAll, unselectAll ] );
            },
            genList: function ( h ) {
                var items = this.genItems( h );
                if ( this.multiple ) {
                    items.unshift( this.genItemControl( h ) );
                }
                return h( 'ul', {
                    staticClass: 'ts-select-list dropdown-menu scrollable-menu'
                }, items );
            },
            getText: function ( item ) {
                return isObject( item ) ? item[ this.itemText ] : item;
            },
            getValue: function ( item ) {
                return isObject( item ) ? item[ this.itemValue ] : item;
            },
            setValue: function ( value ) {
                var oldValue = this.internalValue;
                this.internalValue = value;
                value !== oldValue && this.$emit( 'change', value );
            },
            setSelectedItems: function () {
                var _this = this;
                var selectedItems = [];
                var values = !this.multiple || !Array.isArray( this.internalValue ) ? [ this.internalValue ] : this.internalValue;
                var loop = function ( value ) {
                    var index = _this.internalItems.findIndex( function ( v ) {
                      return _this.valueComparator( _this.getValue( v ), _this.getValue( value ) );
                    } );

                    if ( index > -1 ) {
                        selectedItems.push( _this.internalItems[ index ] );
                    }
                };
                var i = 0;
                var length = values.length;
                for ( ; i < length; i++ ) {
                    var value = values[ i ];
                    loop( value );
                }
                this.selectedItems = selectedItems;
            },
            selectItem: function ( item ) {
                if ( this.multiple ) {
                    var _this = this;
                    var internalValue = ( this.internalValue || [] ).slice();
                    var i = this.findExistingIndex( item );
                    i !== -1 ? internalValue.splice( i, 1 ) : internalValue.push( item );
                    this.setValue( internalValue.map( function ( val ) {
                        return _this.returnObject ? val : _this.getValue( val );
                    } ) );
                } else {
                    this.setValue( this.returnObject ? item : this.getValue( item ) );
                }
            },
            findExistingIndex: function ( item ) {
                var _this = this;
                var itemValue = this.getValue( item );
                return ( this.internalValue || [] ).findIndex( function ( i ) {
                    return _this.valueComparator( _this.getValue( i ), itemValue );
                } );
            },
            valueComparator: function deepEqual ( a, b ) {
                if ( a === b ) {
                    return true;
                }

                if ( a !== Object( a ) || b !== Object( b ) ) {
                  return false;
                }
                var props = Object.keys( a );
                if ( props.length !== Object.keys( b ).length ) {
                  return false;
                }
                return props.every( function ( p ) {
                    return deepEqual(a[ p ], b[ p ]);
                } );
            },
            focus: function () {
                this.$refs.dropdown.$el.focus();
            }
        },
        render: function ( h ) {
            return h( 'div', {
                staticClass: 'ts-select dropdown'
            }, [ this.genButton(), this.genList( h ) ] );
        }
    };

    function isObject ( val ) {
        return typeof val === 'object' && val !== null;
    }
} );