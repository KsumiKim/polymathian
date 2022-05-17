define( [
    'mixins/bind-attrs-mixin',
    'mixins/validatable-mixin',
    'components/TsLabel/TsLabel'
], function ( bindAttrsMixin, validatableMixin, TsLabel ) {
    return {
        mixins: [ bindAttrsMixin, validatableMixin ],
        inheritAttrs: false,
        props: {
            id: String,
            label: String,
            tabindex: { type: [ String, Number ], default: undefined },
            autofocus: Boolean,
            placeholder: String,
            value: null
        },
        data: function () {
            return {
                lazyValue: this.value,
                hasMouseDown: false,
                isFocused: false
            };
        },
        computed: {
            /** @abstract */
            classes: function () {},
            /** @abstract */
            labelClasses: function () {},
            /** @abstract */
            inputClasses: function () {},
            prefixLabel: function () {
                return true;
            },
            computedId: function () {
                return this.id || "input-" + this._uid;
            },
            hasLabel: function () {
                return !!( this.$slots.label || this.label );
            },
            internalValue: {
                get: function () {
                    return this.lazyValue;
                },
                set: function ( val ) {
                    this.lazyValue = val;
                    this.$emit( this.$_modelEvent, val );
                }
            },
            isDirty: function () {
                return !!this.lazyValue;
            },
            isLabelActive: function () {
                return this.isDirty;
            }
        },
        watch: {
            value: function ( val ) {
                this.lazyValue = val;
            }
        },
        beforeCreate: function () {
            this.$_modelEvent = this.$options.model && this.$options.model.event || 'input';
        },
        methods: {
            genLabel: function () {
                if ( !this.hasLabel ) {
                    return null;
                }
                return this.$createElement( TsLabel, {
                    class: this.labelClasses,
                    props: {
                        disabled: this.isDisabled,
                        focused: this.hasState,
                        for: this.computedId
                    }
                }, this.$slots.label || this.label );
            },
            /** @public */
            genContent: function ( label, input ) {
                return this.$createElement( 'div', {
                    class: this.classes
                }, [ label, input ] );
            },
            /** @abstract */
            onFocus: function () {},
            /** @public */
            onClick: function ( e ) {
                this.$emit( 'click', e );
            },
            /** @public */
            onMouseDown: function ( e ) {
                this.hasMouseDown = true;
                this.$emit( 'mousedown', e );
            },
            /** @public */
            onMouseUp: function ( e ) {
                this.hasMouseDown = false;
                this.$emit( 'mouseup', e );
            },
            /** @public */
            focus: function () {
                this.onFocus();
            },
            /** @public */
            blur: function () {
                var _this = this;
                window.requestAnimationFrame( function () {
                    _this.$refs.input && _this.$refs.input.blur();
                } );
            }
        },
        render: function () {
            return this.genContent( this.genLabel(), this.$slots.default );
        }
    };
} );