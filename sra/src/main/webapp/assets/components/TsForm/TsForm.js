define( [], function () {
    return {
        name: 'ts-form',
        functional: true,
        props: {
            size: { type: Number, default: 3 }
        },
        render: function ( h, context ) {
            var fields = context.children.filter( function ( c ) {
                return !!c.tag;
            } );
            var size = context.props.size;
            var classCol = 'col-' + 12 / size;
            var rows = division( fields, context.props.size ).map( function ( items ) {
                return h( 'div', {
                    staticClass: 'ts-form-row d-flex'
                }, items.map( function ( vnode ) {
                    return h( 'div', {
                        staticClass: 'ts-form-col ' + classCol
                    }, [ vnode ] );
                } ) );
            } );
            var container = h( 'div', {
                staticClass: 'ts-form-container'
            }, rows );
            return h( 'form', {
                staticClass: 'ts-form'
            }, [ container ] );
        }
    };


    function division ( arr, n ) {
        var chunks = [];
        var i = 0
        var length = arr.length;
        while ( i < length ) {
            chunks.push( arr.slice( i, i += n ) );
        }
        if ( chunks.length > 0 ) {
            var last = chunks[ chunks.length - 1 ];
            var ii = 0;
            var len = n - last.length;
            for ( ; ii < len; ii++ ) {
                last.push( ' ' );
            }
        }
        return chunks;
    }
} );