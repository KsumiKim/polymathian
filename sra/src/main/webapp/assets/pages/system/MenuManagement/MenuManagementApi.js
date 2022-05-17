define( [
  'axios'
], function ( axios ) {
	return {

		/*메뉴전체 리스트*/
		selectMainMenu: function ( ) {
			return axios.post( '/system2/menu/selectMainMenu');
		},

		/*메뉴전체 리스트*/
		selectSubMenu: function (param) {
			return axios.post( '/system2/menu/selectSubMenu',param);
		},

	};
} );