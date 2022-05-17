define( [
    'mixins/comparable-mixin',
    'mixins/input-mixin',
    'mixins/item-group-mixin-factory',
    'mixins/sizeable-mixin'
], function ( comparableMixin, inputMixin, itemGroupMixinFactory, sizeableMixin ) {
    return {
        name: 'ts-radio-group',
        mixins: [ comparableMixin, inputMixin, itemGroupMixinFactory, sizeableMixin ],
        provide: function () {
            return {
                radioGroup: this
            };
        },
        props: {
            btn: Boolean,
            inline: Boolean,
            outlined: Boolean,
            column: {
                type: Boolean,
                default: true
            },
            name: String,
            row: Boolean,
            value: null
        },
        computed: {
            classes: function () {
                return {
                    'ts-radio-group': true,
                    'btn-group': this.btn
                };
            }
        },
        methods: {
            genLabel: function () {
                var label = inputMixin.methods.genLabel.call( this );
                if ( !label ) {
                    return null;
                }
                label.data.attrs.id = this.computedId;
                delete label.data.attrs.for;
                label.tag = 'legend';
                return label;
            },
            onClick: itemGroupMixinFactory.methods.onClick
        }
    };
} );