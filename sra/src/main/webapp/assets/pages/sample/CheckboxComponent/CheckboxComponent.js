define( [
    'text!./CheckboxComponent.html',
    'text!./document.txt',
    'util/document-parser'
], function ( template, doc, parser ) {
    var fruitList = [
        { name: '바나나', value: 'banana' },
        { name: '사과', value: 'apple' },
        { name: '멜론', value: 'melon' }
    ];
    return {
        template: template,
        data: function ( _this ) {
            return {
                props: parser.parse( doc ),

                fruitList: fruitList,
                baseCheckbox: {
                    isDisabled: false
                },
                singleCheckbox: {
                    value: 'N'
                },
                multipleCheckbox: {
                    value: []
                }
            };
        }
    };
} );