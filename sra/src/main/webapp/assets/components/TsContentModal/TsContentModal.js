define( [
    '../TsContent/TsContent',
    'text!./TsContentModal.html'
], function ( TsContent, template ) {
    return {
        name: 'ts-content-modal',
        mixins: [ TsContent ],
        template: template,
        props: {
            title: String
        },
        methods: {
            close: function () {
                this.$parent && this.$parent.$emit( 'close' );
            }
        }
    };
} );