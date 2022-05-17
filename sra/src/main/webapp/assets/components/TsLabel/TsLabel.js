define( [], function () {
    return {
        name: 'ts-label',
        functional: true,
        props: {
            disabled: Boolean,
            focused: Boolean,
            for: String,
            value: Boolean
        },
        render: function ( h, context ) {
            var children = context.children;
            var listeners = context.listeners;
            var props = context.props;
            var classes = context.data.class;
            var data = {
                class: classes,
                attrs: {
                    for: props.for,
                    'aria-hidden': !props.for
                },
                on: listeners,
                ref: 'label'
            };
            return h( 'label', data, children );
        }
    };
} );