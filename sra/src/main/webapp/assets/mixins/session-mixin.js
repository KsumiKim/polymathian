define( [
    'vuex-map-util'
], function ( vuexMapUtil ) {
    return {
        computed: vuexMapUtil.mapGetters( {
            session: 'session'
        } ),

        methods: vuexMapUtil.mapMutations( {
            registerSession: 'SESSION-REGISTER'
        } )
    }
} );