define( [], function () {
    var rarg = /\{(\d+)\}/g;

    function MessageFormatter ( data ) {
        this.data = data || {};
    }
    MessageFormatter.prototype.getMessage = function ( code /* ...args */ ) {
        var text = this.data[ code ];
        if ( text ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            return text.indexOf( '{' ) >= 0
                ? text.replace( rarg, function ( str, index ) {
                    return args[ index ] || str;
                } )
                : text;
        }
        return code;
    }
    return MessageFormatter;
} );