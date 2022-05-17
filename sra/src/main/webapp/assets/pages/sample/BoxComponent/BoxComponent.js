define( [
    'text!./BoxComponent.html',
    'text!./document.txt',
    'util/document-parser'
], function ( template, doc, parser ) {
    return {
        template: template,
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