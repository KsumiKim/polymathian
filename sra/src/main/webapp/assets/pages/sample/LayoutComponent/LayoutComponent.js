define( [
    'text!./LayoutComponent.html',
    'text!./document.txt',
    'util/document-parser'
], function ( template, doc, parser ) {
    var BackgroundComponent = {
        functional: true,
        props: {
            textBlack: Boolean,
            color: String
        },
        render: function ( h, context ) {
            var props = context.props;
            return h( 'div', {
                staticClass: 'd-flex align-items-center justify-content-center w100 h100',
                style: {
                    'background-color': props.color,
                    'color': props.textBlack ? 'black' : 'white',
                    'font-size': '16px',
                    'font-weight': 'bold'
                }
            }, context.children );
        }
    };
    return {
        template: template,
        components: {
            bg: BackgroundComponent
        },
        data: function () {
            return {
                props: parser.parse( doc )
            };
        },
        computed: {
            styles: function () {
                return {
                    height: '300px'
                };
            }
        }
    };
} );