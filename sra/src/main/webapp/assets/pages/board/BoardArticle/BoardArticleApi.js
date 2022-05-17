define( [
    'axios'
  ], function ( axios ) {
        return {
            selectArticleList: function ( pageNum, pageSize, navigatePages, param ) {
                return axios.post( '/board/selectArticleList', {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    navigatePages: navigatePages,
                    param: param
                } );
            },
            selectArticle: function ( articleId ) {
                return axios.post( '/board/selectArticle', articleId );
            }
        };
  } );