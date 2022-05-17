define( [
    'text!./TsMenuList.html',
    'vuex-map-util'
], function ( template, vuexMapUtil ) {
    return {
        name: 'ts-menu-list',
        template: template,
        props: {
            openId: String,
            menuList: { type: Array, required: true }
        },
        methods: vuexMapUtil.mapActions( {
            attachMenu: 'MENU-ATTACH-ACTIVE'
        } ),
        mounted: function () {
            var _this = this;
            if ( this.openId ) {
                this.menuList.forEach( function ( m ) {
                    if ( m.id === _this.openId ) {
                        _this.attachMenu( m );
                    }
                } );
            }
        }
    };
} );