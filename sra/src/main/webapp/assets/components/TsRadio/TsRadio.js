define( [
    'mixins/bind-attrs-mixin',
    'mixins/groupable-mixin-factory',
    'mixins/input-mixin',
    'mixins/selectable-mixin',
    '../TsText/TsText'
], function ( bindAttrsMixin, groupableMixinFactory, inputMixin, selectableMixin, TsText ) {
    return {
        name: 'ts-radio',
        mixins: [ bindAttrsMixin, groupableMixinFactory( 'radioGroup' ) ],
        inheritAttrs: false,
        props: {
            inline: Boolean,
            id: String,
            label: String,
            name: String,
            readonly: Boolean,
            disabled: Boolean,
            autofocus: Boolean,
            value: { default: null }
        },
        data: function data() {
            return {
                isFocused: false
            };
        },
        mounted: function () {
            this.autofocus && this.tryAutofocus();
        },
        computed: {
            classes: function () {
                return Object.assign( {
                    'ts-radio': true,
                    'ts-radio--inline': this.radioGroup.inline || this.inline,
                    'ts-radio--disabled': this.isDisabled,
                    'ts-radio--readonly': this.isReadonly,
                    'ts-radio--focused': this.isFocused,
                    'form-check': !this.isButtonMode,
                    'form-check-inline': !this.isButtonMode && ( this.radioGroup.inline || this.inline ),
                    'btn-group': this.isButtonMode
                }, this.radioGroup && this.radioGroup.sizableButtonGroupClasses );
            },
            inputClasses: function () {
                return {
                    'ts-radio-input': true,
                    'form-check-input': !this.isButtonMode,
                    'btn-check': this.isButtonMode
                };
            },
            labelClasses: function () {
                return {
                    'ts-radio-label': true,
                    'form-check-label': !this.isButtonMode,
                    'btn': this.isButtonMode,
                    'btn-primary': this.isButtonMode && !this.radioGroup.outlined,
                    'btn-outline-primary': this.isButtonMode && this.radioGroup.outlined
                };
            },
            isButtonMode: function () {
                return Boolean( this.radioGroup && this.radioGroup.btn );
            },
            computedId: function () {
                return inputMixin.computed.computedId.call( this );
            },
            computedName: function () {
                if ( !this.radioGroup ) {
                    if ( this.name ) {
                        return this.name;
                    } else {
                        return 'radio-' + this._uid;
                    }
                }
                return this.radioGroup.name || 'radio-' + this.radioGroup._uid;
            },
            hasLabel: inputMixin.computed.hasLabel,
            hasState: function () {
                return ( this.radioGroup || {} ).hasState;
            },
            isDisabled: function () {
                return this.disabled || !!this.radioGroup && this.radioGroup.isDisabled;
            },
            isReadonly: function () {
                return this.readonly || !!this.radioGroup && this.radioGroup.isReadonly;
            }
        },
        methods: {
            genInput: function ( attrs ) {
                return selectableMixin.methods.genInput.call( this, 'radio', attrs );
            },
            genLabel: function () {
                var _this = this;
                if ( !this.hasLabel ) {
                    return null;
                }
                return this.$createElement( 'label', {
                    class: this.labelClasses,
                    on: {
                        click: function ( e ) {
                            /* 포커스 방지 */
                            // e.preventDefault();
                            _this.onChange();
                        }
                    },
                    attrs: {
                        for: this.computedId
                    },
                    props: {
                        focused: this.hasState
                    }
                }, this.label );
            },
            genRadio: function () {
                return this.genInput( Object.assign( {
                    name: this.computedName,
                    value: this.value
                }, this.attrs$ ) );
            },
            onFocus: function ( e ) {
                this.isFocused = true;
                this.$emit( 'focus', e );
            },
            onBlur: function ( e ) {
                this.isFocused = false;
                this.$emit( 'blur', e );
            },
            onChange: function () {
                if ( this.isDisabled || this.isReadonly || this.isActive ) {
                    return;
                }

                if ( this.radioGroup ) {
                    this.toggle();
                } else {
                    this.$emit( 'change', this.value );
                }
            },
            onClick: function () {},
            onKeydown: function () {},
            tryAutofocus: TsText.methods.tryAutofocus,
            focus: function () {
                this.$refs.input.focus();
            }
        },
        render: function () {
            return inputMixin.methods.genContent.call( this, this.genRadio(), this.genLabel() );
        }
    };
} );