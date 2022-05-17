define( [
    'text!./TsContent.html'
], function ( template ) {
    return {
        name: 'ts-content',
        template: template,
        props: {
            menu: { type: Object, required: true },
            buttonColor: { type: Object, required: false },
        },
        computed: {
            hasHeader: function () {
                return !!this.$slots.header;
            },
            hasBody: function () {
                return !!this.$slots.body;
            },
            hasButtons: function () {
                return this.buttons.length > 0;
            },
            buttons: function () {
                return this.menu.buttons;
            },
            navi: function () {
                // return JSON.parse( this.menu.navigation ).join( ' > ' );
                return this.menu.navigation;
            }
        },
        methods: {
            action: function ( name ) {
                this.$parent.action && this.$parent.action( name );
            },
            getButtonColor: function (button) {
                if ( !this.buttonColor ) {
                    return;
                }
                return this.buttonColor[ button.id ] || 'primary';
            }
        }
    };
} );