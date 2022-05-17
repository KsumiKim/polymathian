define( [
    'vuex-map-util'
], function ( vuexMapUtil ) {
    return {
        provide: function () {
            return {
                mdi: this
            };
        },
        data: function () {
            return {
                components: []
            }
        },
        computed: vuexMapUtil.mapGetters( {
            findMenu: 'findMenu',
            menuMap: 'menuMap'
        } ),
        methods: vuexMapUtil.map( {
            mutations: {
                activeMenu: 'MENU-ACTIVE',
                detachMenuOnly: 'MENU-DETACH',
                detachMenuAll: 'MENU-DETACHALL'
            },
            actions: {
                attachMenu: 'MENU-ATTACH-ACTIVE',
                detachMenu: 'MENU-DETACH-ACTIVE'
            }
        }, {
            register: function ( component ) {
                this.components.push( component );
                // component.$on( 'action', function ( name ) {} );
                var _this = this;
                component.$on( 'menu:detach', function ( e ) {
                    _this.detachMenuOnly(13);
                } );
                component.$on( 'link', function ( e ) {
                    var id = e.id;
                    var menuMap = _this.menuMap;
                    for ( var key in menuMap ) {
                        var menu = menuMap[ key ];
                        if ( menu.id === id ) {
                            menu.linkedArguments = e.data;
                            _this.activeMenu( menu );
                            return;
                        }
                    }

                    var menu = _this.findMenu( id );
                    if ( menu ) {
                        menu.linkedArguments = e.data;
                        _this.attachMenu( menu );
                    } else {
                        alert( '임시 오류, 링크될 메뉴ID 에 해당하는 화면을 검색하지 못함.' );
                    }
                } );
            },
            unregister: function ( component ) {
                var index = this.components.indexOf( component );
                this.components.splice( index, 1 );
            }
        } )
    };
} );