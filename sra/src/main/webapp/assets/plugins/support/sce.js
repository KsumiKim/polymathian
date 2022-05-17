define( [], function () {
var TranslatorComposite = ( function () {
    function TranslatorComposite ( translators ) {
        this.translators = translators || [];
    }
    TranslatorComposite.prototype.translate = function ( text ) {
        var translators = this.translators;
        var i = 0;
        var length = translators.length;
        for ( ; i < length; i++ ) {
            text = translators[ i ].translate( text );
        }
        return text;
    };
    return TranslatorComposite;
} )();

var AsciiUnescapeTranslator = ( function () {
    // WAS escape spec
    var escapeLookupMap = {
        "&quot;": "\"",
        "&#34;":  "\"",
        "&#35;":  "#",
        "&amp;":  "&",
        "&#38;":  "&",
        "&apos;": "'",
        "&#39;":  "'",
        "&#40;":  "(",
        "&#41;":  ")",
        "&lt;":   "<",
        "&#60;":  "<",
        "&gt;":   ">",
        "&#61;":  ">"
    };
    var r_ascii_unescape = new RegExp( '(' + Object.keys( escapeLookupMap ).join( '|' ) + ')', 'g' );
    var _unescape = function ( _, p1 ) {
        return escapeLookupMap[ p1 ];
    };
    function AsciiUnescapeTranslator () {}
    AsciiUnescapeTranslator.prototype.translate = function ( text ) {
        return text.replace( r_ascii_unescape, _unescape );
    };
    return AsciiUnescapeTranslator;
} )();

var FullwidthEscapeTranslator = ( function () {
    function FullwidthEscapeTranslator () {}
    var fullWidthLookupMap = {};
    var startOfAscii = 33;
    var endOfAlAscii = 126;
    var startOfAsciiFullwidth = 65281;
    while ( startOfAscii < endOfAlAscii ) {
        var original = String.fromCharCode( startOfAscii );
        var replacement = String.fromCharCode( startOfAsciiFullwidth );
        fullWidthLookupMap[ original ] = replacement;
        startOfAscii++;
        startOfAsciiFullwidth++;
    }
    FullwidthEscapeTranslator.prototype.translate = function ( text ) {
        var buf = [];
        var i = 0;
        var length = text.length;
        for ( ; i < length; i++ ) {
            var ch = text.charAt( i );
            var replacement = fullWidthLookupMap[ ch ];
            if ( replacement ) {
                ch = replacement;
            }
            buf.push( ch );
        }
        return buf.join( '' );
    };
    return FullwidthEscapeTranslator;
} )();

var XssEscapeTranslator = ( function () {
    function XssEscapeTranslator () {
        this.prepareResolveTranslator = null;
        this.resolveTranslator = null;
    }
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    var whitespaces = whitespace + "*";
    var threatening_tags = [ "script", "style", "meta", "iframe", "object", "applet", "embed", "form" ];
    // html-attribute-key: type
    var identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+";
    // html-attribute-value: 'text' or "text" or <identifier>
    var declaration = "(?:'((?:\\\\.|[^\\\\'])+)'|\"((?:\\\\.|[^\\\\\"])+)\"|(" + identifier + "))";

    var r_threatening_tags = new RegExp( "(<)(/)?" + whitespaces + "(" + threatening_tags.join( '|' ) + ")", 'gi' );
    var r_attribute = new RegExp( "(" + identifier + ")" + whitespaces + "=" + whitespaces + declaration + whitespaces );
    // protocol-scheme: http:// or https:// or abc://
    var r_scheme = /[a-zA-Z]+:\/\//;

    var tagMatcher = function ( text ) {
        return r_threatening_tags.test( text );
    };
    var attrPredicate = {
        "href": function ( value ) { return r_scheme.test( value ); },
        "onerror": function () { return true; },
        "onclick": function () { return true; },
        "onmousemove": function () { return true; },
        "onmouseover": function () { return true; },
        "onmouseleave": function () { return true; },
        "onmouseout": function () { return true; },
        "onmouseup": function () { return true; },
        "onmousedown": function () { return true; },
        "ontouchmove": function () { return true; },
        "ontouchstart": function () { return true; },
        "ontouchend": function () { return true; },
        "onfocus": function () { return true; },
        "onfocusin": function () { return true; },
        "onfocusout": function () { return true; }
    };
    var attrMatcher = function ( text ) {
        var match;
        while ( ( match = r_attribute.exec( text ) ) ) {
            text = text.slice( match.index + match[ 0 ].length );
            var key = match[ 1 ].toLowerCase();
            var predicate = attrPredicate[ key ];
            if ( predicate ) {
                var value = ( match[ 2 ] || match[ 3 ] || match[ 4 ] ).trim();
                if ( predicate( value ) ) {
                    return true;
                }
            }
        }
        return false;
    }
    var test = ( function () {
        var matchers = [ tagMatcher, attrMatcher ];
        return function ( text ) {
            var i = 0;
            var length = matchers.length;
            for ( ; i < length; i++ ) {
                if ( matchers[ i ]( text ) ) {
                    return true;
                }
            }
            return false;
        }
    } )();
    XssEscapeTranslator.prototype.setResolveTranslator = function ( translator ) {
        this.resolveTranslator = translator
    };
    XssEscapeTranslator.prototype.translate = function ( text ) {
        if ( this.resolveTranslator && test( text ) ) {
            text = this.resolveTranslator.translate( text );
        }
        return text;
    };
    return XssEscapeTranslator;
} )();

var SumiTranslator = function () {};
SumiTranslator.prototype.translate = function () {
    return '나는 크숨킴이야';
};

return ( function () {
    var asciiUnescapeTranslator = new AsciiUnescapeTranslator();
    var xssEscapeTranslator = new XssEscapeTranslator();
    xssEscapeTranslator.setResolveTranslator( new SumiTranslator() );
    var translator = new TranslatorComposite( [ asciiUnescapeTranslator, xssEscapeTranslator ] );

    var exports = {};
    exports.escape = function ( text ) {
        return typeof text === 'string' ? translator.translate( text ) : null;
    };
    return exports;
} )();
} );