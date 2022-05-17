define( [], function () {
    return function factory ( namespace ) {
        var inject = {};
        inject[ namespace ] = {
            default: undefined
        };
        return {
            inject: inject,
            props: {
                activeClass: {
                    type: String,
                    default: function () {
                        if ( !this[ namespace ] ) {
                            return undefined;
                        }
                        return this[ namespace ].activeClass;
                    }
                },
                disabled: Boolean
            },
            data: function () {
                return {
                    isActive: false
                };
            },
            computed: {
                groupClasses: function () {
                    if ( !this.activeClass ) {
                        return {};
                    }
                    var classes = {};
                    classes[ this.activeClass ] = this.isActive;
                    return classes;
                }
            },
            created: function () {
                this[ namespace ] && this[ namespace ].register( this );
            },
            beforeDestroy: function () {
                this[ namespace ] && this[ namespace ].unregister( this );
            },
            methods: {
                toggle: function () {
                    this.$emit( 'change' );
                }
            }
        };
    };
} );