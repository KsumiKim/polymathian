define( [
    'text!./AlertComponent.html',
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
        methods: {
            onClickAlert: function () {
                alert( '알럿창클릭' );
            },
            onClickAlertBtn: function () {
                alert( '버튼클릭' );
            },
        }
    };
} );