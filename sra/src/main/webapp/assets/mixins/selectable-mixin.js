define( [
    'mixins/input-mixin',
    'mixins/comparable-mixin'
], function ( inputMixin, comparableMixin ) {
    return {
        mixins: [ inputMixin, comparableMixin ],
        model: {
            prop: 'inputValue',
            event: 'change'
        },
        props: {
            id: String,
            inputValue: null,
            trueValue: null,
            falseValue: null,
            multiple: {
                type: Boolean,
                default: null
            },
            label: String
        },
        data: function () {
            return {
                lazyValue: this.inputValue
            };
        },
        computed: {
            isMultiple: function () {
                return this.multiple === true || this.multiple === null && Array.isArray( this.internalValue );
            },
            isActive: function () {
                var _this = this;
                var value = this.value;
                var input = this.internalValue;

                if ( this.isMultiple ) {
                    if ( !Array.isArray( input ) ) {
                        return false;
                    }
                    return input.some( function ( item ) {
                        return _this.valueComparator( item, value );
                    } );
                }

                if ( this.trueValue === undefined || this.falseValue === undefined ) {
                    return value ? this.valueComparator( value, input ) : Boolean( input );
                }
                return this.valueComparator( input, this.trueValue );
            },
            isDirty: function isDirty () {
                return this.isActive;
            },
        },
        watch: {
            inputValue: function ( val ) {
                this.lazyValue = val;
            }
        },
        mounted: function () {
            this.autofocus && this.tryAutofocus();
        },
        methods: {
            genInput: function ( type, attrs ) {
                return this.$createElement( 'input', {
                    class: this.inputClasses,
                    attrs: Object.assign( {
                        'aria-checked': this.isActive.toString(),
                        disabled: this.isDisabled,
                        id: this.computedId,
                        role: type,
                        type: type,
                        tabindex: this.isDisabled ? -1 : this.tabindex
                    }, attrs ),
                    domProps: {
                        value: this.value,
                        checked: this.isActive
                    },
                    on: {
                        blur: this.onBlur,
                        change: this.onChange,
                        focus: this.onFocus,
                        keydown: this.onKeydown,
                        click: this.onClick
                    },
                    ref: 'input'
                } );
            },
            onBlur: function () {
                this.isFocused = false;
            },
            onChange: function () {
                var _this = this;
                if ( !this.isInteractive ) {
                    return;
                }
                var value = this.value;
                var input = this.internalValue;
                if ( this.isMultiple ) {
                    if ( !Array.isArray( input ) ) {
                        input = [];
                    }
                    var length = input.length;
                    input = input.filter( function ( item ) {
                        return !_this.valueComparator( item, value );
                    } );

                    if ( input.length === length ) {
                        input.push( value );
                    }
                } else if ( this.trueValue !== undefined && this.falseValue !== undefined ) {
                    input = this.valueComparator( input, this.trueValue ) ? this.falseValue : this.trueValue;
                } else if ( value ) {
                    input = this.valueComparator( input, value ) ? null : value;
                } else {
                    input = !input;
                }
                this.validate( true, input );
                this.internalValue = input;
            },
            /** @abstract */
            tryAutofocus: function () {},
            /** @abstract */
            onFocus: function () {},
            /** @abstract */
            onKeydown: function () {},
            /** @abstract */
            onClick: function ( e ) {
                e.stopPropagation();
            }
        }
    };
} );