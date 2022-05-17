define( [], function () {
    return {
        props: {
            valueComparator: {
                type: Function,
                default: function deepEqual ( a, b ) {
                    if ( a === b ) {
                        return true;
                    }

                    if ( a instanceof Date && b instanceof Date ) {
                      if ( a.getTime() !== b.getTime() ) return false;
                    }

                    if ( a !== Object( a ) || b !== Object( b ) ) {
                      return false;
                    }
                    var props = Object.keys( a );
                    if ( props.length !== Object.keys( b ).length ) {
                        return false;
                    }
                    return props.every( function ( p ) {
                        return deepEqual( a[ p ], b[ p ] );
                    } );
                  }
            }
        }
    };
} );