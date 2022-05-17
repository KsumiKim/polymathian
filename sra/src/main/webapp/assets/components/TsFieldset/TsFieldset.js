define( [], function () {
    return {
        name: 'ts-fieldset',
        functional: true,
        props: {
            label: { type: String, required: true },
            red: Boolean,
            tooltipPosition: { type: String, default: 'top' },
            tooltipText: String
        },
        render: function ( h, context ) {
            var props = context.props;
            var label = h( 'div', {
                directives: [ {
                    name: 'tooltip',
                    arg: props.tooltipPosition,
                    value: props.tooltipText
                } ],
                style: {
                    color: props.red ? 'red' : null
                }
            }, [ props.label ] );
            var legend = h( 'div', {
                staticClass: 'col-4 text-center text-truncate'
            }, [ h( 'span', {
                staticClass: 'align-middle'
            }, [ label ] ) ] );
            var inputs = h( 'div', {
                staticClass: 'col-8'
            }, context.children );
            return h( 'div', {
                staticClass: 'ts-fieldset row'
            }, [ legend, inputs ] );
        }
    };
} );