define( [
], function () {
    return {
        props: {
            menu: { type: Object, required: true }
        },
        methods: {
            $close: function () {
                this.$emit( 'close' );
            }
        }
    };
} );