define( [
    'text!./RadioComponent.html'
], function ( template ) {
    var fruitList = [
        { name: '바나나', value: 'banana' },
        { name: '사과', value: 'apple' },
        { name: '멜론', value: 'melon' }
    ];
    return {
        template: template,
        data: function ( _this ) {
            return {
                fruitList: fruitList,
                baseRadio: {
                    isReadonly: false,
                    isDisabled: false
                },
                radioGroup1: {
                    value: null
                },
                radioGroup2: {
                    value: null
                }
            };
        }
    };
} );