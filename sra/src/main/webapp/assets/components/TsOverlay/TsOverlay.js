define( [], function () {
    return {
        name: 'ts-overlay',
        props: {
            absolute: Boolean,
            color: { type: String, default: '#212121' },
            zIndex: { type: [ Number, String ], default: 5000 },
            value: { default: true }
        },
        data: function () {
            return {
                isActive: !!this.value,
                opacity: 0.45
            };
        },
        watch: {
            value: function ( val ) {
                this.isActive = !!val;
            },
            isActive: function ( val ) {
                !!val !== this.value && this.$emit( 'input', val );
            }
        },
        computed: {
            classes: function () {
                return Object.assign( {
                    'ts-overlay': true,
                    'ts-overlay--absolute': this.absolute,
                    'ts-overlay--active': this.isActive
                }, this.themeClasses );
            },
            internalScrim: function () {
                return this.$createElement( 'div', {
                    staticClass: 'ts-overlay-scrim',
                    style: {
                        'background-color': this.color,
                        'border-color': this.color,
                        opacity: this.computedOpacity
                    }
                } );
            },
            computedOpacity: function () {
                return Number( this.isActive ? this.opacity : 0 );
            },
            styles: function () {
                return {
                    zIndex: this.zIndex
                };
            }
        },
        methods: {
            genContent: function () {
                return this.$createElement( 'div', {
                  staticClass: 'ts-overlay-content'
                }, this.$slots.default );
            }
        },
        render: function render ( h ) {
            var children = [ this.internalScrim ];
            if ( this.isActive ) {
                children.push( this.genContent() );
            }
            return h( 'div', {
                class: this.classes,
                style: this.styles
            }, children );
        }
    };
} );