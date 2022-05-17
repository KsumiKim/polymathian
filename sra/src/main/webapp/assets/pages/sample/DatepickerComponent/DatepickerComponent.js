define( [
    'text!./DatepickerComponent.html',
    'js-joda',
    'text!./document.txt',
    'util/document-parser'
], function ( template, JSJoda, doc, parser ) {
    var LocalDate = JSJoda.LocalDate;
    return {
        template: template,
        data: function () {
            return {
                props: parser.parse( doc ),

                datepicker1: {
                    value: LocalDate.now()
                },
                datepicker2: {
                    value: [ LocalDate.now().minusMonths( 1 ), LocalDate.now() ]
                }
            };
        },
        methods: {
            init: function () {
                this.datepicker1.value = LocalDate.now();
                this.datepicker2.value = [ LocalDate.now().minusMonths( 1 ), LocalDate.now() ];
            }
        }
    }
} );