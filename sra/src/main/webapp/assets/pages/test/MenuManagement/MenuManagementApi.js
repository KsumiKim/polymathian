define( [
    'axios'
], function ( axios ) {
    return {
        selectMenuList: function ( name ) {
            return axios.post( '/test/MenuManagement/selectMenuList', {
                name: name
            } );
        },
        selectPageMenuList: function ( name, pageNum, pageSize, navigatePages ) {
            return axios.post( '/test/MenuManagement/selectPageMenuList', {
                pageNum: pageNum,
                pageSize: pageSize,
                navigatePages: navigatePages,
                param: name
            } );
        }
    };
} );