define( [
    'text!./TextareaComponent.html',
    'text!./document.txt',
    'util/document-parser'
], function ( template, doc, parser ) {
    return {
        template: template,
        data: function () {
            return {
                props: parser.parse( doc ),

                baseText: {
                    value: '',
                    isReadonly: false,
                    isDisabled: false
                }
            };
        },
        methods: {
            onClickPrependButton: function () {
                alert( '좌측버튼 클릭' );
            },
            onClickAppendButton: function () {
                alert( '우측버튼 클릭' );
            },
            onClickCustomButton: function () {
                alert( '커스텀버튼 클릭' );
            }
        }
    };
} );