define( [
    'mixins/item-group-mixin-factory',
    '../TsTabsItems/TsTabsItems'
], function ( itemGroupMixin, TsTabsItems ) {
    return {
        name: 'ts-tabs',
        mixins: [ itemGroupMixin ],
        provide: function () {
            return {
                tabs: this
            };
        },
        computed: {
            classes: function () {
                return {
                    'ts-tabs': true,
                    'd-flex': true,
                    'flex-column': true
                };
            },
            tabsClasses: function () {
                return {
                    'nav': true,
                    'nav-tabs': true,
                    'flex-grow-0': true
                }
            },
            itemsClasses: function () {
                return {
                    'flex-grow-1': true
                };
            }
        },
        methods: {
            genTabs: function ( items ) {
                return this.$createElement( 'div', {
                    class: this.tabsClasses
                }, items );
            },
            genItems: function ( itemList, items ) {
                var _this = this;
                if ( itemList ) {
                    return itemList;
                }

                if ( !items.length ) {
                    return null;
                }
                return this.$createElement( TsTabsItems, {
                    class: this.itemsClasses,
                    props: {
                        value: this.internalValue
                    },
                    on: {
                        change: function ( val ) {
                            _this.internalValue = val;
                        }
                    }
                }, items );
            },
            parseSlots: function ( slots ) {
                var tabs = [];
                var itemList;
                var items = [];

                var i = 0;
                var length = slots.length;
                for ( ; i < length; i++ ) {
                    var vnode = slots[ i ];
                    if ( vnode.componentOptions ) {
                        switch ( vnode.componentOptions.Ctor.options.name ) {
                            case 'ts-tabs-items':
                                itemList = vnode;
                                break;

                            case 'ts-tab-item':
                                items.push( vnode );
                                break;

                            default:
                                tabs.push( vnode );
                        }
                    } else {
                        tabs.push( vnode );
                    }
                }
                return {
                    tabs: tabs,
                    itemList: itemList,
                    items: items
                };
            }
        },
        render: function ( h ) {
            var slot = this.parseSlots( this.$slots.default );
            return h( 'nav', {
                class: this.classes
            }, [ this.genTabs( slot.tabs ), this.genItems( slot.itemList, slot.items ) ] );
        }
    };
} );