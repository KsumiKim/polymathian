define( [
    'mixins/proxyable-mixin-factory'
], function ( proxyableMixinFactory ) {
    return {
        name: 'ts-pagination',
        mixins: [ proxyableMixinFactory( 'value', 'input' ) ],
        props: {
            disabled: Boolean,
            value: Number,
            pageInfo: { type: Object, default: function() { return {} } },
        },
        data: function () {
            return {
                firstIcon: '《',
                prevIcon: '〈',
                nextIcon: '〉',
                lastIcon: '》'
            };
        },
        computed: {
            classes: function () {
                return {};
            },
            length: function () {
                return this.pageInfo.pages || 0;
            },
            items: function () {
                return this.pageInfo.navigatepageNums || [];
            },
            countInfo: function() {
                var total = this.pageInfo.total || 0;
                return 'Total Count: ' + total + ', Total Page: ' + this.length;
            }
        },
        watch: {
            internalValue: function ( value, oldValue ) {
                if ( value !== oldValue ) {
                    this.$emit( 'change', value );
                }
            }
        },
        methods: {
            first: function ( e ) {
                e.preventDefault();
                this.internalValue = 1;
                this.$emit( 'first' );
            },
            prev: function ( e ) {
                e.preventDefault();
                this.internalValue = this.value - 1;
                this.$emit( 'prev' );
            },
            next: function ( e ) {
                e.preventDefault();
                this.internalValue = this.value + 1;
                this.$emit( 'next' );
            },
            last: function ( e ) {
                e.preventDefault();
                this.internalValue = this.length;
                this.$emit( 'last' );
            },
            genIcon: function ( h, icon, disabled, fn ) {
                return h( 'li', {
                    staticClass: 'ts-pagination-item page-item',
                }, [
                    h( 'a', {
                        staticClass: 'ts-pagination-item-link page-link',
                        attrs: {
                            href: '#'
                        },
                        on: disabled ? {} : { click: fn }
                    }, [
                        h( 'span', {
                            attrs: {
                                'aria-hidden': true
                            }
                        }, [ icon ] )
                    ] )
                ] );
            },
            genItem: function ( h, i ) {
                var _this = this;
                return h( 'a', {
                    staticClass: 'ts-pagination-item-link page-link',
                    attrs: {
                        href: '#',
                    },
                    on: {
                        click: function ( e ) {
                            e.preventDefault();
                            return _this.$emit( 'input', i );
                        }
                    }
                }, [ i.toString() ] );
            },
            genItems: function ( h ) {
                var _this = this;
                return this.items.map( function ( i, index ) {
                    return h( 'li', {
                        staticClass: 'ts-pagination-item page-item',
                        class: {
                            'ts-pagination-item--active active': i === _this.value,
                        },
                        key: index
                    }, [ _this.genItem( h, i )] );
                } );
            },
            genList: function ( h, children ) {
                return h( 'ul', {
                    staticClass: 'ts-pagination pagination',
                    class: this.classes
                }, children );
            }
        },
        render: function ( h ) {
            var firstIcon = this.genIcon( h, this.firstIcon, this.value <= 1, this.first );
            var prevIcon = this.genIcon( h, this.prevIcon, this.value <= 1, this.prev );
            var nextIcon = this.genIcon( h, this.nextIcon, this.value >= this.length, this.next );
            var lastIcon = this.genIcon( h, this.lastIcon, this.value >= this.length, this.last );
            var children = [ firstIcon, prevIcon, this.genItems( h ), nextIcon, lastIcon ];
            return h( 'nav', {
                staticClass: 'ts-nav-pagination d-flex justify-content-between align-items-center'
            }, [
                h( 'span', {
                    staticClass: 'text-truncate align-middle'
                }, [ this.countInfo ] ) ,
                this.genList( h, children ) ,
                h( 'span', {}, [] ) ,
            ] );
        }
    }
} );