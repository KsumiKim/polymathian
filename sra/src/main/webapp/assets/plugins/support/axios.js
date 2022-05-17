define( [
    '@axios'
], function ( axios ) {
var http = axios.create( {
    baseURL: '',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 1000 * 90
} );
http.interceptors.request.use(
    function ( config ) {
        transactionStart( config );
        return config;
    },
    function ( error ) {
        return Promise.reject( error )
    }
);
http.interceptors.response.use(
    function ( response ) {
        transactionEnd( response.config );
        return response.config.originalResponse ? response : response.data;
    },
    function ( error ) {
        transactionEnd( error.config );
        var response = error.response;
        if ( response ) {
            var status = response.status;
            if ( !response.config.authFailHandle && status === 401 ) {
                http.logout();
                return new Promise( function () {} );
            }
            if ( isObject( response.data ) && response.data.unknown ) {
                notify( response.data.message );
                return new Promise( function () {} );
            } else {
                return Promise.reject( response.data );
            }
        }
        notify( '인터넷 연결 상태를 확인해주세요.' );
        return new Promise( function () {} );
    }
);


http.code = function ( param ) {
    return http.post( '/common/codeMap', param );
};

http.multipart = function ( url, json, files ) {
    var formData = new FormData();

    formData.append( 'json', new Blob( [ JSON.stringify( json ) ], {
        type: 'application/json'
    } ) );

    files.forEach( function ( file ) {
        formData.append( 'files', file );
    } );
    return http.post( url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    } );
};

http.login = function ( username, password ) {
    return http.post( '/auth/login', {
        p: username,
        c: password
    } );
};

http.logout = function () {
    if ( window.location.pathname.includes( '/login' ) ) {
        return;
    }
    window.location.href = '/logout';
};

http.signup = function ( user, thumbnail ) {
    return http.multipart( '/signup', user, thumbnail );
}

var notify = function () {};
http.setNotifyFunction = function ( _notify ) {
    notify = _notify;
};

var loading = function () {};
http.setLoadingFunction = function ( _loading ) {
    loading = _loading;
};

var transactionCount = 0;
var transactionStart = function ( config ) {
    if ( !config.quiet ) {
        ++transactionCount;
        loading( true );
    }
};
var transactionEnd = function ( config ) {
    if ( !config.quiet ) {
        if ( --transactionCount <= 0 ) {
            loading( false );
        }
    }
};

return http;
function isObject ( v ) { return v !== null && typeof v === 'object'; }
function isArray ( v ) { return Array.isArray( v ); }
function isString ( v ) { return typeof v === 'string'; }
} );