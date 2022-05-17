define( [
    'text!./Modal2.html',
    '../CaseRegistrationApi'
], function ( template, http ) {
    return {
        template: template,
        props: {
            data: { type: Object, required: true },
            callback: { type: Function, required: true }
        },
        modal: {
            width: 800,
            height: 600
        },
        data: function () {
            return {
                grid1: {
                    columns: [
                        { fieldName: 'profCd'	         , dataType: 'text', visible: false },
                        { fieldName: 'acptYear'	         , dataType: 'text', visible: false },
                        { fieldName: 'jgCd'	             , dataType: 'text', visible: false },
                        { fieldName: 'dfntRrNo'	         , dataType: 'text', visible: false },
                        { fieldName: 'crmeCd'            , dataType: 'text', visible: false },
                        { fieldName: 'crmeSeq'           , dataType: 'text', visible: false },
                        { fieldName: 'mrgCaseAcptYear'   , dataType: 'text', width: '50' , header: { text: '병합사건년도' } },
                        { fieldName: 'mrgCaseJgCd'       , dataType: 'text', width: '50' , header: { text: '병합사건심급' } },
                        { fieldName: 'mrgCaseJSeqno'     , dataType: 'text', width: '50' , header: { text: '병합사건순번' } }
                    ],
                    rows: []
                },
            };
        },
        computed: {
            gridSubtitle: function () {
				var length = this.grid1.rows.length;
				return length > 0 ? '' + length : '데이터가 없습니다';
			}
        },
        mounted: function () {
            this.grid1.rows = [ {mrgCaseAcptYear: 1, mrgCaseJgCd: 2, mrgCaseJSeqno: 3},
                                {mrgCaseAcptYear: 11, mrgCaseJgCd: 22, mrgCaseJSeqno: 33} ];
        },
        methods: {
            save: function() {
                var _this = this;

				this.$refs.grid1.getGridView().commit( true );
				var rowState = this.$refs.grid1.getModifiedRowState();
                var isValid = true;

				var createdRows = rowState.created;
				var updatedRows = rowState.updated;

				var modifiedRows = [];
				modifiedRows.push.apply( modifiedRows, createdRows);
				modifiedRows.push.apply( modifiedRows, updatedRows );

                var filteredRows = this.getRowsAfterFilteringDeletedRows();
                console.log( filteredRows );
            },
            setDisplayData: function() {
                var jsonRows = this.$refs.grid1.getGridView().getJsonRows();
                var displayCrme = '';

                console.log( jsonRows );

                if ( jsonRows.length > 1 ) {
                    displayCrme = jsonRows[ 0 ].crme + ' 등';
                } else if ( jsonRows.length === 1 ) {
                    displayCrme = jsonRows[ 0 ].crme;
                }
                this.callback( displayCrme );
            },
			/*
			* 그리드 행 추가
			*/
			insertGridRow: function() {
				this.$refs.grid1.createAppendRow();
			},
			/*
			* 그리드 행 삭제
			*/
			deleteGridRow: function() {
				this.$refs.grid1.setDeleteRowState();
			},
			/*
			* 그리드 엑셀 다운로드
			*/
			excelDownloadGrid: function() {
				this.$refs.grid1.exportGrid( '적용법조 목록' );
			},
            getRowsAfterFilteringDeletedRows: function() {
                var indices = this.$refs.grid1.getDataProvider().getStateRows( 'deleted' );
                var jsonRows = this.$refs.grid1.getGridView().getJsonRows();

                return jsonRows.filter( function( _row, idx ) {
                    return !indices.includes( idx );
                } );
            }
        }
    };
} );