define( [
    'mixins/input-mixin',
    'mixins/sizeable-mixin',
    '../TsBtn/TsBtn'
], function ( inputMixin, sizeableMixin, TsBtn ) {
    return {
        name: 'ts-text',
        mixins: [ inputMixin, sizeableMixin ],
        props: {
            floating: Boolean,
            prependOutlined: Boolean,
            prependColor: String,
            prependStart: Boolean,
            prependMdi: Boolean,
            prependText: String,
            prependIcon: String,
            appendOutlined: Boolean,
            appendColor: String,
            appendEnd: Boolean,
            appendMdi: Boolean,
            appendText: String,
            appendIcon: String
        },
        data: function () {
            return {
                initialValue: null
            };
        },
        computed: {
            classes: function () {
                return {
                    'ts-text': true,
                    'ts-text--form-floating': this.floating,
                    'form-floating': this.floating
                }
            },
            labelClasses: function () {
                return {
                    'ts-text-label': true,
                    'form-label': true
                };
            },
            inputClasses: function () {
                return {
                    'ts-text-input': true,
                    'form-control': true
                };
            },
            prependSlotMethod: function () {
                return this.prependStart ? 'push' : 'unshift';
            },
            appendSlotMethod: function () {
                return this.appendEnd ? 'unshift' : 'push';
            }
        },
        watch: {
            isFocused: 'updateValue'
        },
        mounted: function () {
            if ( this.$refs.inputGroup ) {
                siblings( this.$refs.inputGroup.firstChild ).map( function ( elem ) {
                    return elem.classList.contains( 'ts-text' )
                        ? Array.prototype.slice.call( elem.children, 0 )
                        : elem;
                    } )
                    .flat()
                    .forEach( function ( elem ) {
                        if ( elem.classList.contains( 'ts-text-input-group' ) ) {
                            insertOutsideParent( elem, function ( parent ) {
                                return parent.classList.contains( 'ts-text' );
                            } );
                        } else if ( elem.classList.contains( 'ts-select' ) ) {
                            insertOutsideParent( elem );
                        }
                    } );
            }
            this.autofocus && this.tryAutofocus();
        },
        methods: {
            genInputGroup: function () {
                return this.$createElement( 'div', {
                    staticClass: 'ts-text-input-group input-group',
                    class: this.sizeableInputGroupClasses,
                    ref: 'inputGroup'
                }, [ this.genContent() ] );
            },
            genContent: function () {
                return [ this.genPrependSlot(), this.genText(), this.genAppendSlot() ];
            },
            genText: function () {
                var listeners = Object.assign( {}, this.listeners$ );
                delete listeners[ 'change' ];
                /**
                 * @description
                 * https://getbootstrap.com/docs/5.0/forms/floating-labels
                 * Wrap a pair of <input class="form-control"> and <label> elements in .form-floating to enable floating labels with Bootstrap’s textual form fields.
                 * A placeholder is required on each <input> as our method of CSS-only floating labels uses the :placeholder-shown pseudo-element.
                 * Also note that the <input> must come first so we can utilize a sibling selector (e.g., ~).
                 */
                var placeholder = this.placeholder;
                if ( this.floating && !placeholder ) {
                    placeholder = ' ';
                }
                return this.$createElement( 'input', {
                    class: this.inputClasses,
                    domProps: {
                        value: this.type === 'number' && Object.is( this.lazyValue, -0 ) ? '-0' : this.lazyValue
                    },
                    attrs: Object.assign( {}, this.attrs$, {
                        type: this.type,
                        id: this.computedId,
                        placeholder: placeholder,
                        tabindex: this.isDisabled ? -1 : this.tabindex,
                        readonly: this.isReadonly,
                        disabled: this.isDisabled
                    } ),
                    on: Object.assign( listeners, {
                        blur: this.onBlur,
                        focus: this.onFocus,
                        keydown: this.onKeyDown,
                        keyup: this.onKeyUp,
                        input: this.onInput
                    } ),
                    ref: 'input'
                } );
            },
            genIcon: function ( type, classes, props, text ) {
                var _this = this;
                var eventName = 'click:' + type;
                var hasListener = !!this.listeners$[ eventName ];
                var data = {
                    class: classes,
                    props: props,
                    attrs: {
                        'aria-label': hasListener ? type + ' icon' : undefined,
                        disabled: this.isDisabled,
                        readonly: this.isReadonly
                    },
                    on: hasListener ? {
                        click: function ( e ) {
                            e.preventDefault();
                            e.stopPropagation();
                            _this.$emit( eventName, e );
                        },
                        mouseup: function ( e ) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    } : undefined,
                    ref: type + 'Icon'
                };
                return this.$createElement( TsBtn, data, [ text ] );
            },
            genPrependSlot: function () {
                var slots = [];
                var prependSlots = [];
                var templateSlots = splitSlots( this.$slots.prepend );
                if ( this.prependText || this.prependIcon ) {
                    var icon = this.genIcon( 'prepend', {
                        'ts-text-prepend': true
                    }, {
                        outlined: this.prependOutlined,
                        color: this.prependColor,
                        iconMdi: this.prependMdi,
                        icon: this.prependIcon
                    }, this.prependText );
                    prependSlots.push( icon );
                }
                prependSlots[ this.prependSlotMethod ].apply( prependSlots, templateSlots.buttons );
                if ( prependSlots.length > 0 ) {
                    slots.push( this.$createElement( 'div', {
                        staticClass: 'input-group-prepend'
                    }, prependSlots ) );
                }
                slots.push.apply( slots, templateSlots.inputs );
                return slots;
            },
            genAppendSlot: function () {
                var slots = [];
                var appendSlots = [];
                var templateSlots = splitSlots( this.$slots.append );
                if ( this.appendText || this.appendIcon ) {
                    var icon = this.genIcon( 'append', {
                        'ts-text-append': true
                    }, {
                        outlined: this.appendOutlined,
                        color: this.appendColor,
                        iconMdi: this.appendMdi,
                        icon: this.appendIcon
                    }, this.appendText );
                    appendSlots.push( icon );
                }
                appendSlots[ this.appendSlotMethod ].apply( appendSlots, templateSlots.buttons );
                if ( appendSlots.length > 0 ) {
                    slots.push( this.$createElement( 'div', {
                        staticClass: 'input-group-append'
                    }, [ appendSlots ] ) );
                }
                slots.push.apply( slots, templateSlots.inputs );
                return slots;
            },
            onBlur: function ( e ) {
                var _this = this;
                this.isFocused = false;
                e && this.$nextTick( function () {
                    return _this.$emit( 'blur', e );
                } );
            },
            onFocus: function ( e ) {
                if ( !this.$refs.input ) {
                    return;
                }

                if ( document.activeElement !== this.$refs.input ) {
                    return this.$refs.input.focus();
                }

                if ( !this.isFocused ) {
                    this.isFocused = true;
                    e && this.$emit( 'focus', e );
                }
            },
            onKeyDown: function ( e ) {
                if ( e.keyCode === 13 ) {
                    this.$emit( 'change', this.internalValue );
                }
                this.$emit( 'keydown', e );
            },
            onKeyUp: function ( e ) {
                this.$emit( 'keyup', e );
            },
            onInput: function ( e ) {
                var target = e.target;
                this.internalValue = target.value;
            },
            tryAutofocus: function () {
                var input = this.$refs.input;
                if ( !this.autofocus || !input ) {
                    return false;
                }

                if ( document.activeElement === input ) {
                    return false;
                }
                input.focus();
                return true;
            },
            updateValue: function ( val ) {
                if ( val ) {
                    this.initialValue = this.lazyValue;
                } else if ( this.initialValue !== this.lazyValue ) {
                    this.$emit( 'change', this.lazyValue );
                }
            }
        },
        render: function ( h ) {
            var slots = [];
            if ( this.hasLabel ) {
                slots.push( this.genLabel() );
            }

            if ( this.floating ) {
                slots.unshift( this.genText() );
            } else {
                slots.push( this.genInputGroup() );
            }
            return h( 'div', {
                class: this.classes
            }, slots );
        }
    };

    function splitSlots ( slots ) {
        var appendSlots = slots || [];
        var i = 0;
        var length = appendSlots.length;
        var inputs = [];
        var buttons = [];
        for ( ; i < length; i++ ) {
            var vnode = appendSlots[ i ];
            var name = ( vnode.componentOptions && vnode.componentOptions.Ctor.options.name ) || vnode.tag;
            switch ( name ) {
                case 'ts-btn':
                case 'button':
                    buttons.push( vnode );
                    break;

                case 'ts-text':
                case 'ts-textarea':
                case 'input':
                case 'textarea':
                    inputs.push( vnode );
                    break;
            }
        }
        return {
            inputs: inputs,
            buttons: buttons
        };
    }

    function forEach ( arr, fn ) {
        var i = 0;
        var length = arr.length;
        for ( ; i < length; i++ ) {
            fn( arr[ i ], i );
        }
    }

    function insertOutsideParent ( elem, recursivePredicate ) {
        var parent = elem.parentNode;
        forEach( siblings( elem.firstChild ), function ( child ) {
            parent.insertBefore( child, elem.nextSibling );
        } );
        parent.removeChild( elem );
        recursivePredicate && recursivePredicate( parent ) && insertOutsideParent( parent );
    }

    function siblings ( n, elem ) {
        var matched = [];
        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== elem ) {
                matched.push( n );
            }
        }
        matched.reverse();
        return matched;
    };
} );