define( [
    'axios'
  ], function ( axios ) {
        return {
            sendMail: function ( param, files ) {
                files = files.filter( function ( file ) {
                    return file instanceof File;
                } );

                console.log( files.length );

                if ( files.length > 0 ) {
                    return axios.multipart( '/common/sendMultipartMail', param, files );
                }
                return axios.post( '/common/sendMail', param );
            }
        };
  } );