define( [
], function () {
    return {
        name: 'doc-sentence',
        functional: true,
        props: {
            sm: Boolean,
            md: Boolean,
            lg: Boolean,
            nested: Boolean,
            title: String
        },
        render: function ( h, context ) {
            var props = context.props;
            var contents = [];
            if ( props.title ) {
                var tag;
                if ( props.sm ) {
                    tag = 'p';
                } else if ( props.md ) {
                    tag = 'h5';
                } else if ( props.lg ) {
                    tag = 'h3';
                } else {
                    tag = 'h3';
                }
                contents.push( h( tag, [ props.title ] ) );
            }

            var computedSlots = context.slots();
            var slots = computedSlots.default ? computedSlots.default.filter( function ( slot ) {
                return slot.tag;
            } ) : [];
            var data = {
                style: props.nested ? 'padding-left: 15px' : undefined
            };
            if ( props.nested ) {
                contents.push( h( 'div', data, slots ) );
            } else {
                contents.push( h( 'ul', data, slots.map( function ( slot ) {
                    return h( 'li', [ slot ] );
                } ) ) );
            }
            return h( 'article', contents );
        }
    };
} );