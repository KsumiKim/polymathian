define( [
    '../TsLayout/TsLayout'
], function ( TsLayout ) {
    return {
        name: 'ts-box',
        props: {
            title: String,
            subtitle: String,
            static: Boolean,
            tooltipPosition: { type: String, default: 'top' },
            tooltipText: String
        },
        computed: {
            hasHeader: function () {
                return this.hasLeft || this.hasRight;
            },
            hasLeft: function () {
                return !!( this.title || this.$slots.left );
            },
            hasRight: function () {
                return !!this.$slots.right;
            },
            hasBody: function () {
                return !!this.$slots.body;
            }
        },
        methods: {
            genHeader: function () {
                var contents = [];
                if ( this.hasLeft ) {
                    contents.push( this.$createElement( 'div', [ this.genLeft() ] ) );
                }

                if ( this.hasRight ) {
                    contents.push( this.$createElement( 'div', [ this.genRight() ] ) );
                }
                var layout = this.$createElement( TsLayout, {
                    staticClass: 'ts-box-header-layout justify-content-between',
                    props: {
                        column: false
                    }
                }, contents );
                return this.$createElement( 'div', {
                    staticClass: 'ts-box-header',
                }, [ layout ] );
            },
            genLeft: function () {
                var slots = this.$slots.left || [];
                if ( this.title ) {
                    slots = [ this.$createElement( 'span', {
                        staticClass: 'ts-box-title text-truncate align-middle',
                        directives: [ {
                            name: 'tooltip',
                            arg: this.tooltipPosition,
                            value: this.tooltipText
                        } ]
                    }, [ this.title ] ) ];
                }

                if ( this.subtitle ) {
                    slots.push( this.$createElement( 'span', { staticClass: 'ts-box-subtitle text-truncate align-middle' }, [ '(', this.subtitle, ')' ] ) );
                }
                return this.$createElement( 'div', { staticClass: 'ts-box-header-left' }, slots );
            },
            genRight: function () {
                return this.$createElement( 'div', { staticClass: 'ts-box-header-right' }, this.$slots.right );
            },
            genBody: function () {
                return this.$createElement( 'div', { staticClass: 'ts-box-body' }, this.$slots.body );
            }
        },
        render: function ( h ) {
            var contents = [];
            if ( this.hasHeader ) {
                contents.push( h( 'div', { staticClass: 'flex-grow-0' }, [ this.genHeader() ] ) );
            }

            if ( this.hasBody ) {
                contents.push( h( 'div', { staticClass: this.static ? 'flex-grow-0' : 'flex-grow-1' }, [ this.genBody() ] ) );
            }
            var layout = h( TsLayout, {
                staticClass: 'ts-box-layout',
                props: {
                    column: true
                }
            }, contents );
            return h( 'div', {
                staticClass: 'ts-box mx-auto'
            }, [ layout ] );
        }
    };
} );