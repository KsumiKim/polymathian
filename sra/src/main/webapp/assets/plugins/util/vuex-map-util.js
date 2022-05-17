define( [
    'vuex'
], function ( Vuex ) {
    return {
        mapGetters: function ( spec, target ) {
            return this.map( { getters: spec }, target );
        },
        mapMutations: function ( spec, target ) {
            return this.map( { mutations: spec }, target );
        },
        mapActions: function ( spec, target ) {
            return this.map( { actions: spec }, target );
        },
        map: function ( spec, target ) {
            var extended = target ? Object.assign( {}, target ) : {};
            var getters = spec.getters;
            if ( getters ) {
                Object.assign( extended, Vuex.mapGetters( getters ) )
            }
            var mutations = spec.mutations;
            if ( mutations ) {
                Object.assign( extended, Vuex.mapMutations( mutations ) )
            }
            var actions = spec.actions;
            if ( actions ) {
                Object.assign( extended, Vuex.mapActions( actions ) )
            }
            return extended;
        }
    };
} );