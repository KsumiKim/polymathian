define( [
    '../TsBtn/TsBtn'
], function ( TsBtn ) {
    return {
        name: 'ts-alert',
        props: {
            text: String,
            primary: Boolean,
            warning: Boolean,
            danger: Boolean
        },
        computed: {
            classes: function () {
                var classes = { 'alert': true };
                classes[ 'alert-' + this.internalStyleOptions.color ] = true;
                return classes;
            },
            internalStyleOptions: function () {
                var options = {};
                if ( this.primary ) {
                    options.color = 'primary';
                    options.icon = 'check';

                } else if ( this.warning ) {
                    options.color = 'warning';
                    options.icon = "favorite";

                } else if ( this.danger ) {
                    options.color = 'danger';
                    options.icon = "help";
                } else {
                    options.color = 'primary';
                    options.icon = "check";
                }
                return options;
            },
            hasHeaderAndBody: function () {
                return !!( this.$slots.header && this.$slots.body );
            }
        },
        methods: {
            genIcon: function () {
                var _this = this;
                return this.$createElement( TsBtn, {
                    props: {
                        color: this.internalStyleOptions.color,
                        icon: this.internalStyleOptions.icon
                    },
                    on: {
                        click: function ( e ) {
                            e.stopPropagation();
                            _this.$emit( 'click:icon' );
                        }
                    }
                } );
            },
            genText: function () {
                var text;
                if ( this.text ) {
                    text = this.text;
                } else if ( this.hasHeaderAndBody ) {
                    text = [ this.$slots.header, this.$createElement( 'hr' ), this.$slots.body ];
                } else {
                    text = this.$slots.default;
                }
                return text;
            }
        },
        render: function ( h ) {
            var _this = this;
            return h( 'div', {
                class: this.classes,
                on: {
                    click: function () {
                        _this.$emit( 'click' );
                    }
                }
            }, [ this.genIcon(), this.genText() ] );
        }
    };
} );