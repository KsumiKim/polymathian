define( [], function () {
    var rcode = /(?:'([^']+)'|([^']+))/g;
    return {
        name: 'doc-phrase',
        functional: true,
        props: {
            tag: String,
            type: String,
            default: String
        },
        render: function ( h, context ) {
            var props = context.props;
            if ( !( props.tag || props.type || props.default ) ) {
                return h( 'p', [ 'N/A' ] );
            }

            var children = [];
            if ( props.tag ) {
                children.push( h( 'code', [ props.tag ] ) );
            }

            if ( props.type || props.default ) {
                var def = [];
                if ( props.type ) {
                    def.push( 'Type: ', h( 'code', [ props.type ] ) );
                }

                if ( props.default ) {
                    def.push( 'Default: ', h( 'code', [ props.default ] ) );
                }

                if ( def.length === 4 ) {
                    def.splice( 2, 0, ', ' );
                }
                def.unshift( '(' );
                def.push( ')' );
                children.push( def );
            }

            if ( children.length > 0 ) {
                children.push( h( 'br' ) );
            }

            if ( context.children.length === 1 ) {
                var descr = context.children[ 0 ].text;
                if ( descr && descr.includes( "'" ) ) {
                    descr.replace( rcode, function ( _, p1, p2 ) {
                        children.push( p1 ? h( 'code', [ p1 ] ) : p2 );
                    } );
                } else {
                    children.push( context.children );
                }
            } else {
                children.push( context.children );
            }
            return h( 'p', [ children ] );
        }
    };
} );