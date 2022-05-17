define( [], function () {
    return {
        name: 'doc-section',
        functional: true,
        props: {
            title: String,
            subtitle: String
        },
        render: function ( h, context ) {
            var props = context.props;
            var slots = context.slots();

            var header = h( 'div', {
                staticClass: 'doc-header'
            }, [ h( 'h1', [ props.title, h( 'small', [ props.subtitle ] ) ] ) ] );

            var body = h( 'div', {
                staticClass: 'row'
            }, [
                h( 'div', { staticClass: 'col-lg-6' }, [ slots.left ] ),
                h( 'div', { staticClass: 'col-lg-6' }, [ slots.right ] )
            ] );
            return h( 'section', {
                staticClass: 'doc-section container-fluid'
            }, [ header, body ] );
        }
    };
} );