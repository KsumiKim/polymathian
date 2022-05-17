define( [], function () {
    return {
        name: 'ts-title',
        functional: true,
        render: function ( h, context ) {
            if ( context.children.length !== 1 ) {
                return null;
            }
            var text = context.children[ 0 ].text;
            return h( 'div', {
                staticClass: 'ts-title fw-bold'
            }, [ text ] );
        }
    };
} );