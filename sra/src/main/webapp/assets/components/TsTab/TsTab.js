define( [
    'mixins/validatable-mixin',
    'mixins/groupable-mixin-factory'
], function ( validatableMixin, groupableMixinFactory ) {
    return {
        name: 'ts-tab',
        mixins: [ validatableMixin, groupableMixinFactory( 'tabs' ) ],
        props: {
            value: String
        },
        data: function () {
            return {
                proxyClass: 'ts-tab--active'
            };
        },
        computed: {
            classes: function () {
                return {
                    'ts-tab': true,
                    'ts-tab--disabled': this.disabled,
                    'nav-link': true,
                    'active': this.isActive
                };
            }
        },
        methods: {
            click: function ( e ) {
                this.$emit( 'click', e );
                this.toggle();
            }
        },
        render: function ( h ) {
            var _this = this;
            return h( 'button', {
                class: this.classes,
                attrs: {
                    'aria-selected': String( this.isActive ),
                    role: 'tab',
                    tabindex: 0
                },
                on: {
                    click: this.click,
                    keydown: function ( e ) {
                        if ( e.keyCode === 13 ) {
                            _this.click( e );
                        }
                        _this.$emit( 'keydown', e );
                    }
                }
            }, this.$slots.default );
        }
    };
} );