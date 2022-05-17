define( [
    'mixins/mdi-tabs-mixin',
    'text!./TsMdi.html',
    'vuex-map-util'
], function ( mdiTabsMixin, template, vuexMapUtil ) {
    return {
        name: 'ts-mdi',

        template: template,

        mixins: [ mdiTabsMixin ],

        computed: vuexMapUtil.mapGetters( {
            menuMap: 'menuMap'
        } ),

        methods: vuexMapUtil.map( {
            mutations: {
                activeMenu: 'MENU-ACTIVE'
            },
            actions: {
                detachMenu: 'MENU-DETACH-ACTIVE'
            }
        } )
    };
} );