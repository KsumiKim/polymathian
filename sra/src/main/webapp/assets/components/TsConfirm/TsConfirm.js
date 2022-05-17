define( [
    'text!./TsConfirm.html'
], function ( template ) {
    return {
        name: 'ts-confirm',
        template: template,
        props: {
            title: { type: String, default: '알림' },
            text: { type: String, default: '계속하시겠습니까?' },
            buttons: { type: [ Object, Array ], required: true }
        },
        data: function () {
            return {
                internalButtons: converObjectToArray(this.buttons)
            };
        },
        methods: {
            close: function () {
                this.$emit( 'close' );
            }
        }
    };

    function converObjectToArray ( obj ) {
        if ( !Array.isArray(obj) && typeof obj === 'object' ) {
            return [
                { name: '확인', color: 'primary', onClick: obj.ok || noop },
                { name: '취소', color: 'danger', onClick: obj.cancel || noop }
            ];
        }
        return obj;
    }

    function noop () {};
} );