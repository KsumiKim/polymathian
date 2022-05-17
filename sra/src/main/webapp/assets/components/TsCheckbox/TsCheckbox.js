define( [
    'mixins/selectable-mixin',
    '../TsText/TsText'
], function ( selectableMixin, TsText ) {
    return {
        name: 'ts-checkbox',
        mixins: [ selectableMixin ],
        props: {
            switch: Boolean,
            inline: Boolean
        },
        computed: {
            classes: function () {
                return {
                    'ts-checkbox': true,
                    'ts-checkbox--inline': this.inline,
                    'ts-checkbox--switch': this.switch,
                    'ts-checkbox--disabled': this.isDisabled,
                    'ts-checkbox--readonly': this.isReadonly,
                    'ts-checkbox--focused': this.isFocused,
                    'form-check': true,
                    'form-check-inline': this.inline,
                    'form-switch': this.switch
                };
            },
            labelClasses: function () {
                return 'ts-checkbox-label form-check-label';
            },
            inputClasses: function () {
                return 'ts-checkbox-input form-check-input';
            },
            isDisabled: function () {
                return this.disabled || !!this.form && this.form.disabled;
            },
            isInteractive: function () {
                return !this.isDisabled && !this.isReadonly;
            },
            isReadonly: function () {
                return this.readonly || !!this.form && this.form.readonly;
            },
        },
        watch: {
            isActive: function () {}
        },
        methods: {
            genCheckbox: function () {
                return this.genInput( 'checkbox', Object.assign( {}, this.attrs$, {
                    'aria-checked': this.isActive.toString()
                } ) );
            },
            onBlur: TsText.methods.onBlur,
            onFocus: TsText.methods.onFocus,
            tryAutofocus: TsText.methods.tryAutofocus
        },
        render: function () {
            return this.genContent( this.genCheckbox(), this.genLabel() );
        }
    };
} );