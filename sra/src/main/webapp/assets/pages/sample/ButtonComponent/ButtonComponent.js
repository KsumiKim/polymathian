define( [
    'text!./ButtonComponent.html',
    'text!./document.txt',
    'util/document-parser'
], function ( template, doc, parser ) {
    return {
        template: template,
        data: function () {
            return {
                props: parser.parse( doc ),

                increment: 0,

                baseBtn: {
                    isDisabled: false
                }
            };
        }
    };
} );