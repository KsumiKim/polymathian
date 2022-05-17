define( [
    '../TsText/TsText'
], function ( TsText ) {
    return {
        name: 'ts-textarea',
        mixins: [ TsText ],
        props: {
            rows: {
                type: [ String, Number ],
                default: 3,
                validator: function validator ( v ) {
                    return !isNaN( parseInt( v, 10 ) );
                }
            }
        },
        methods: {
            genText: function () {
                var input = TsText.methods.genText.call( this );
                input.tag = 'textarea';
                delete input.data.attrs.type;
                input.data.attrs.rows = this.rows;
                return input;
            },
            onKeyDown: function ( e ) {
                if ( this.isFocused && e.keyCode === 13 ) {
                    e.stopPropagation();
                }
                this.$emit( 'keydown', e );
            }
        }
    };
} );