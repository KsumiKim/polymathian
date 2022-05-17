define( [], function () {
    var rdoc = /^([^\t]+)\t([^\t]+)\t([^\t]+)\t("[^"]+"|[^\t]+)$/;
    return {
        parse: function ( text ) {
            var docList = [];
            var texts = text.trim().split( /[\r\n]+/ );
            texts.forEach( function ( t ) {
                var match = rdoc.exec( t );
                if ( match ) {
                    docList.push( {
                        tag: match[ 1 ],
                        type: match[ 2 ],
                        default: match[ 3 ],
                        description: match[ 4 ]
                    } );
                }
            } );
            return docList;
        }
    }
} );