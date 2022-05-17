define( [], function () {
    return {
        name: 'ts-layout',
        functional: true,
        props: {
            ma: Boolean,
            pa: Boolean,
            column: Boolean,
            noHeight: Boolean
        },
        render: function ( h, context ) {
            var props = context.props;
            var data = context.data;
            return h( 'div', {
                staticClass: data.staticClass,
                class: {
                    'ts-layout': true,
                    'ts-layout--margin': props.ma && !props.column,
                    'ts-layout--margin-column': props.ma && props.column,
                    'ts-layout--padding': props.pa && !props.column,
                    'ts-layout--padding-column': props.pa && props.column,
                    'd-flex': true,
                    'flex-column': props.column,
                    'w100': true,
                    'h100': !props.noHeight
                }
            }, context.children );
        }
    };
} );