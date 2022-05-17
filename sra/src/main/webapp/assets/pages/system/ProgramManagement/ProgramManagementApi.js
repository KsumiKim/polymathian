define( [
  'axios'
], function ( axios ) {
	return {

		selectProgramList: function ( name, pageNum, pageSize, navigatePages ) {
			return axios.post( '/system/ProgramManagement/selectProgramList', {
				pageNum: pageNum,
				pageSize: pageSize,
				navigatePages: navigatePages,
				param: name
			} );
		},

		modifyProgram: function ( rowState ) {
			return axios.post( '/system/ProgramManagement/modifyProgram', rowState );
		},

		modifyProgramButton: function ( rowState ) {
			return axios.post( '/system/ProgramManagement/modifyProgramButton', rowState );
		},

		selectProgramButtonList: function ( program ) {
			return axios.post( '/system/ProgramManagement/selectProgramButtonList', program );
		},

		selectCommonList: function( commonCodes ) {
			return axios.post( '/common/commonCodeList', commonCodes );
		}
	};
} );