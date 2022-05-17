define( [
    'axios'
], function ( axios ) {
    return {
        uploadFiles: function ( board, files ) {
            files = files.filter( function ( file ) {
                return file instanceof File;
            } );
            axios.multipart( '/system/FileManagement/uploadFiles', board, files );
        }
    }
} );