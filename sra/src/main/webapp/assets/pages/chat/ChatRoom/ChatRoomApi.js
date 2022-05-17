define( [
    'axios'
  ], function ( axios ) {
        return {
            selectChatRoom: function ( chatUsers ) {
                return axios.post( '/chat/selectChatRoom', chatUsers );
            },
            selectRoom: function ( param ) {
                return axios.post( '/chat/selectRoom', param );
            },
            selectUserList: function () {
                return axios.post( '/chat/selectUserList' );
            },
            selectChatHistories: function ( roomId ) {
                return axios.post( '/chat/selectChatHistories', roomId );
            }
        };
  } );