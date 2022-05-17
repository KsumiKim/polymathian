define( [
    'vue',
    'vuex',
    'vue-async-component-provider'
], function ( Vue, Vuex, vueAsyncComponentProvider ) {
    var menuOrder = 0;

    var store = {
        state: {
            session: {},
            menuList: [],
            menuMap: {},

            stompClient: {},
            chatContent: {},
            chatHistories: {},
            chatUser: {},
        },
        getters: {
            session: function ( state ) {
                return state.session;
            },
            menuList: function ( state ) {
                return state.menuList;
            },
            findMenu: function ( state ) {
                var menuList = state.menuList;
                return function ( id ) {
                    var i = 0;
                    var length = menuList.length;
                    for ( ; i < length; i++ ) {
                        var menu = menuList[ i ];
                        if ( menu.id === id ) {
                            return menu;
                        }
                    }
                    return null;
                }
            },
            menuMap: function ( state ) {
                return state.menuMap;
            },
            stompClient: function( state ) {
                return state.stompClient;
            },
            chatContent: function( state ) {
                return state.chatContent
            },
            chatUser: function( state ) {
                return state.chatUser
            },
            chatHistories: function( state ) {
                return state.chatHistories
            }
        },
        mutations: {
            'SESSION-REGISTER': function ( state, session ) {
                state.session = session;
            },
            'MENU-SAVE-LIST': function ( state, menuList ) {
                state.menuList = menuList;
            },
            'MENU-ATTACH': function ( state, menu ) {
                var isAttached = Object.keys( state.menuMap ).some( function ( key ) {
                    return state.menuMap[ key ] === menu;
                } );
                if ( !isAttached ) {
                    if ( !menu.componentLoader ) {
                        menu.componentLoader = vueAsyncComponentProvider.provide( menu.src );
                    }
                    Vue.set( menu, 'activated', true );
                    Vue.set( state.menuMap, menuOrder++, menu );
                }
            },
            'MENU-DETACH': function ( state, menu ) {
                var predicate = typeof menu === 'number'
                    ? function ( m ) { return m.id === menu; }
                    : function ( m ) { return m === menu; };

                var menuMap = state.menuMap;
                Object.keys( menuMap ).forEach( function ( key ) {
                    if ( predicate( menuMap[ key ] ) ) {
                        Vue.delete( menuMap, key );
                    }
                } );
            },
            'MENU-DETACHALL': function ( state, menu /* keepalive */ ) {
                var predicate = typeof menu === 'number'
                    ? function ( m ) { return m.id === menu; }
                    : function ( m ) { return m === menu; };

                var menuMap = state.menuMap;
                Object.keys( menuMap ).forEach( function ( key ) {
                    if ( predicate( menu ) ) {
                        Vue.set( menu, 'activated', true );
                    } else {
                        Vue.delete( menuMap, key );
                    }
                } );
            },
            'MENU-ACTIVE': function ( state, menu /* Nullable */ ) {
                var keys = Object.keys( state.menuMap );
                keys.forEach( function ( key ) {
                    state.menuMap[ key ].activated = false;
                } );
                if ( menu ) {
                    menu.activated = true;
                } else {
                    if ( keys.length > 0 ) {
                        state.menuMap[ keys[ keys.length - 1 ] ].activated = true;
                    }
                }
            },
            'STOMPCLIENT-REGISTER': function ( state, stompClient ) {
                state.stompClient = stompClient;
            },
            'CHAT-CONTENT-UPDATE': function( state, chatContent ) {
                state.chatContent = chatContent;
            },
            'CHAT-HISTORIES-UPDATE': function( state, chatHistories ) {
                state.chatHistories = chatHistories;
            },
            'USER-STATUS-UPDATE': function( state, user ) {
                state.chatUser = user;
            }
        },
        actions: {
            'MENU-ATTACH-ACTIVE': function ( context, menu ) {
                context.commit( 'MENU-ATTACH', menu );
                context.commit( 'MENU-ACTIVE', menu );
            },
            'MENU-DETACH-ACTIVE': function ( context, menu ) {
                context.commit( 'MENU-DETACH', menu );
                if ( menu.activated ) {
                    context.commit( 'MENU-ACTIVE' );
                }
            }
        }
    };
    Vue.use( Vuex );
    return new Vuex.Store( store );
} );