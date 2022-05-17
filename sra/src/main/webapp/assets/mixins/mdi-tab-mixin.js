define( [
    'vuex-map-util'
], function ( vuexMapUtil ) {
    var resize = function () {
        if ( typeof window.Event === 'function' ) {
            window.dispatchEvent( new window.Event( 'resize' ) );
        } else {
            var evt = window.document.createEvent( 'UIEvents' );
            evt.initUIEvent( 'resize', true, false, window, 0 );
            window.dispatchEvent( evt );
        }
    };
    return {
        inject: [ 'mdi' ],
        props: {
            menu: { type: Object, required: true },
            active: { type: Boolean, required: true }
        },
        watch: {
            active: function ( activated ) {
                if ( activated ) {
                    if ( this.menu.linkedArguments ) {
                        this.link( this.menu.linkedArguments );
                        this.menu.linkedArguments = null;
                    }
                    this.$nextTick( resize );
                }
            }
        },
        created: function () {
            this.mdi && this.mdi.register( this );
        },
        mounted: function () {
            if ( this.menu.linkedArguments ) {
                this.link( this.menu.linkedArguments );
                this.menu.linkedArguments = null;
            }
            this.$nextTick( resize );
        },
        beforeDestroy: function () {
            this.mdi && this.mdi.unregister( this );
        },
        methods: vuexMapUtil.mapActions( {
            attachMenu: 'MENU-ATTACH-ACTIVE'
        }, {
            action: function ( name ) {
                this.$emit( 'action', name );
                this[ name ]();
            },
            search: function () {},
            save: function () {},
            delete: function () {},
            link: function () {}
        } )
    };
} );