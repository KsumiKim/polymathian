define( [
    'mixins/validatable-mixin',
    'mixins/groupable-mixin-factory'
], function ( validatableMixin, groupableMixinFactory ) {
    return {
        name: 'ts-tab-item',
        mixins: [ validatableMixin, groupableMixinFactory( 'tabsItems' ) ],
        props: {
            eager: Boolean,
            value: String
        },
        data: function () {
            return {
                isBooted: false
            }
        },
        computed: {
            classes: function () {
                return {
                    'ts-tab-item': true,
                    'tab-pane': true,
                    'active': this.isActive
                };
            },
            hasContent: function () {
                return this.isBooted || this.eager || this.isActive;
            }
        },
        watch: {
            isActive: function () {
                this.isBooted = true
            }
        },
        methods: {
            showLazyContent: function ( content ) {
                return this.hasContent && content ? content() : [ this.$createElement() ];
            }
        },
        render: function ( h ) {
            var _this = this;
            return this.showLazyContent( function () {
                return h( 'div', {
                    class: _this.classes
                }, _this.$slots.default );
            } );
        }
    };
} );