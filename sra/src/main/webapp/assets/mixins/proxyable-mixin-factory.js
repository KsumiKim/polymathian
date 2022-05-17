define( [], function () {
    return function factory ( prop, event ) {
        if ( prop === void 0 ) {
            prop = 'value';
        }

        if ( event === void 0 ) {
            event = 'change';
        }
        var props = {};
        props[ prop ] = { required: false };
        var watch = {};
        watch[ prop ] = function ( val ) {
            this.internalLazyValue = val;
        };
        return {
            model: {
                prop: prop,
                event: event
            },
            props: props,
            data: function () {
                return {
                    internalLazyValue: this[ prop ]
                };
            },
            computed: {
                internalValue: {
                    get: function () {
                        return this.internalLazyValue;
                    },
                    set: function ( val ) {
                        if ( val === this.internalLazyValue ) return;
                        this.internalLazyValue = val;
                        this.$emit( event, val );
                    }
                }
            },
            watch: watch
        };
    }
} )