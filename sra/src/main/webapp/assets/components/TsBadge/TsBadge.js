define( [], function () {
    return {
        name: 'ts-badge',
        props: {
            color: { type: String, default: 'primary' },
            absolute: Boolean,
            rounded: Boolean,
            circle: Boolean,
        },
        computed: {
            classes: function () {
                var classes = {
                    'badge': true,
                    'rounded-pill': this.rounded,
                    'rounded-circle p-2': this.circle,
                    'position-absolute': this.absolute
                };
                classes[ 'bg-' + this.color ] = true;
                return classes;
            },
        },
        render: function ( h ) {
            var content = this.$slots.default || ' ';
            return h( 'span', {
                class: this.classes
            }, content );
        }
    };
} );