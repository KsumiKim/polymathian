define( [
    'mixins/item-group-mixin-factory'
], function ( itemGroupMixin ) {
    return {
        name: 'ts-tabs-items',
        mixins: [ itemGroupMixin ],
        provide: function () {
            return {
                tabsItems: this
            };
        },
        computed: {
            classes: function () {
                return {
                    'ts-tabs-items': true,
                    'tab-content': true
                };
            }
        }
    };
} );