define( [
    'axios'
  ], function ( axios ) {
        return {
            selectCase: function ( caseInfo ) {
                return axios.post( '/system/CaseRegistration/selectCase', caseInfo );
            },
            modifyCase: function ( caseInfo ) {
                return axios.post( '/system/CaseRegistration/modifyCase', caseInfo );
            },
            selectDfntList: function ( dfntInfo ) {
                return axios.post( '/system/CaseRegistration/selectDfntList', dfntInfo );
            },
            selectDfntCrmeList: function ( dfntInfo ) {
                return axios.post( '/system/CaseRegistration/selectDfntCrmeList', dfntInfo );
            },
            modifyDfnt: function ( dfntInfo ) {
                return axios.post( '/system/CaseRegistration/modifyDfnt', dfntInfo );
            },
            modifyCrme: function ( crmeInfo ) {
                return axios.post( '/system/CaseRegistration/modifyCrme', crmeInfo );
            },
            selectReportInfo: function ( caseInfo ) {
                return axios.post( '/system/CaseRegistration/selectReportInfo', caseInfo );
            },
            selectChildCodeList: function( obj ) {
                return axios.post( '/common/codeMap', obj );
            }
        };
  } );