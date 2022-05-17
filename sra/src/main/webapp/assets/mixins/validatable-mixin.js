define( [], function () {
    return {
        props: {
            disabled: Boolean,
            readonly: Boolean
        },
        computed: {
            isDisabled: function () {
                return this.disabled || !!this.form && this.form.disabled;
            },
            isInteractive: function () {
                return !this.isDisabled && !this.isReadonly;
            },
            isReadonly: function () {
                return this.readonly || !!this.form && this.form.readonly;
            }
        },
        methods: {
            validate: function ( force, value ) {}
        }
    };
} )