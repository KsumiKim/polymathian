define( [
    'mixins/validatable-mixin',
    'mixins/sizeable-mixin',
    '../TsBadge/TsBadge'
], function ( validatableMixin, sizeableMixin, TsBadge ) {
    return {
        name: 'ts-btn',
        mixins: [ validatableMixin, sizeableMixin ],
        props: {
            color: { type: String, default: 'primary' },
            outlined: Boolean,
            tabindex: { type: [ String, Number ], default: undefined },
            block: Boolean,
            tag: { type: String, default: 'button' },
            type: { type: String, default: 'button' },
            iconMdi: Boolean,
            icon: String,
            badge: [ Number, String ],
            badgeColor: String,
            badgeAlert: Boolean,
            label: String
        },
        computed: {
            classes: function () {
                var iconMdiMode = this.icon && this.iconMdi;
                var classes = {
                    'btn': true,
                    'mdi': iconMdiMode,
                    'material-icons': this.icon && !this.iconMdi,
                    'position-relative': this.hasBadge && this.badgeAlert
                };
                classes[ this.icon ] = iconMdiMode;
                return Object.assign( classes, this.sizableButtonClasses );
            },
            hasBadge: function () {
                return this.badge !== undefined && this.badge !== null;
            }
        },
        methods: {
            genBlock: function ( content ) {
                return this.$createElement( 'div', {
                    staticClass: 'd-grid'
                }, [ content ] );
            },
            genButton: function () {
                var contents = [ this.icon ? this.icon : this.label ? this.label : this.$slots.default ];
                if ( this.hasBadge ) {
                    contents.push( "\x20", this.genBadge() );
                }
                return this.$createElement( this.tag, {
                    staticClass: 'btn-' + ( this.outlined ? 'outline-' : '' ) + this.color,
                    class: Object.assign( this.classes, {
                        'btn-block': this.block
                    } ),
                    style: this.sizeableStyles,
                    attrs: {
                        type: this.type,
                        disabled: this.isDisabled,
                        tabindex: this.isDisabled ? -1 : this.tabindex,
                    },
                    on: {
                        click: this.click
                    }
                }, contents );
            },
            genBadge: function () {
                return this.$createElement( TsBadge, {
                    class: {
                        'top-0': this.badgeAlert,
                        'start-100': this.badgeAlert,
                        'translate-middle': this.badgeAlert,
                        'rounded-pill': this.badgeAlert
                    },
                    props: {
                        color: this.badgeColor
                            ? this.badgeColor
                            : this.badgeAlert ? 'danger' : undefined,
                        absolute: this.badgeAlert,
                        rounded: false
                    }
                }, [ this.badge ] );
            },
            click: function ( e ) {
                this.$emit( 'click', e );
            }
        },
        render: function () {
            return this.genButton();
        }
    };
} );