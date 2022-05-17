define( [], function () {
    var rnumeric = /^([0-9]+)$/;
    return {
        props: {
            sm: Boolean,
            lg: Boolean,
            width: [ String, Number ]
        },
        computed: {
            md: function () {
                return !this.sm && !this.lg;
            },
            sizableButtonClasses: function () {
                return this.md ? {} : {
                    'btn-sm': this.sm,
                    'btn-lg': this.lg
                };
            },
            sizableButtonGroupClasses: function () {
                return this.md ? {} : {
                    'btn-group-sm': this.sm,
                    'btn-group-lg': this.lg
                };
            },
            sizeableInputGroupClasses: function () {
                return this.md ? {} : {
                    'input-group-sm': this.sm,
                    'input-group-lg': this.lg
                };
            },
            sizeableFormControlClasses: function () {
                return this.md ? {} : {
                    'form-control-sm': this.sm,
                    'form-control-lg': this.lg
                };
            },
            calculateWidth: function () {
                var calculated = this.width;
                if ( calculated !== undefined ) {
                    return ( '' + calculated ).replace( rnumeric, '$1px' );
                }
                return undefined;
            },
            sizeableStyles: function () {
                var styles = {};
                if ( this.calculateWidth !== undefined ) {
                    styles.width = this.calculateWidth;
                }
                return styles;
            }
        }
    };
} );