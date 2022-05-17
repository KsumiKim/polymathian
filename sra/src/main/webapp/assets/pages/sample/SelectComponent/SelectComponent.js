define( [
    'text!./SelectComponent.html',
    'text!./document.txt',
    'util/document-parser'
], function ( template, doc, parser ) {
    var sizeList = [
        { value: 'sm', name: 'Small' },
        { value: 'md', name: 'Medium' },
        { value: 'lg', name: 'Large' }
    ];
    var fruitList = [
        { name: '바나나', value: 'banana' },
        { name: '사과', value: 'apple' },
        { name: '멜론', value: 'melon' }
    ];
    var vegetableList = [
        { nm: '당근', val: 'carrot' },
        { nm: '옥수수', val: 'corn' },
        { nm: '피망', val: 'piment' }
    ]
    return {
        template: template,
        data: function ( _this ) {
            return {
                props: parser.parse( doc ),

                sizeList: sizeList,
                fruitList: fruitList,
                vegetableList: vegetableList,
                baseSelect: {
                    isDisabled: false
                },
                singleSelect1: {
                    value: null
                },
                singleSelect2: {
                    value: null
                },
                multipleSelect1: {
                    value: [],
                },
                multipleSelect2: {
                    value: []
                }
            };
        }
    };
} );