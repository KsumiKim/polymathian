define( [
    'text!./TsNotify.html'
], function ( template ) {
    return {
        name: 'ts-notify',
        template: template,
        props: {
            params: { type: Object, required: true }
        },
        computed: {
            messages: function () {
                var text = this.params.item.text || '';
                return text.split( '\n' );
            }
        }
    };
} );