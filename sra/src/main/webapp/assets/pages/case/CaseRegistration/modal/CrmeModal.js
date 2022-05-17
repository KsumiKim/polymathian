define( [
    'text!./CrmeModal.html',
    '../CaseRegistrationApi'
], function ( template, http ) {

    return {
        template: template,

        code: function () {
            return {
                crmeCd: { groupCd: 'CRME_CD' },
            };
        },
        props: {
            data: { type: Object, required: true },
            callback: { type: Function, required: true }
        },
        data: function () {
            return {
                grid1: {
                    columns: [
                        { fieldName: 'profCd'	, dataType: 'text', visible: false },
                        { fieldName: 'acptYear'	, dataType: 'text', visible: false },
                        { fieldName: 'jgCd'	    , dataType: 'text', visible: false },
                        { fieldName: 'dfntRrNo'	, dataType: 'text', visible: false },
                        { fieldName: 'crmeCd'   , dataType: 'text', visible: false },
                        { fieldName: 'crmeSeq'  , dataType: 'text', visible: false },
                        { fieldName: 'crme'     , dataType: 'text', width: '50' , header: { text: '죄명' } }
                    ],
                    rows: []
                },
            };
        },
        mounted: function( crmeCd ) {
            this.setCodes( { crmeCd: crmeCd } );
            this.selectDfntCrmeList();
            this.setFieldsOnRowInserted();
            this.onDropDownSelected();
            console.log( this );
        },
        computed: {
            gridSubtitle: function () {
				var length = this.grid1.rows.length;
				return length > 0 ? '' + length : '데이터가 없습니다';
			}
        },
        methods: {
			/*
			* 죄명 데이터 수정 후 모달창 close 시 첫번째 row의 죄명을 부모에 전달
			*/
            // close: function() {
            //     var jsonRows = this.$refs.grid1.getGridView().getJsonRows( );
            //     var displayCrme = '';

            //     if ( jsonRows.length > 1 ) {
            //         displayCrme = jsonRows[ 0 ].crme + ' 등';
            //     } else if ( jsonRows.length === 1 ) {
            //         displayCrme = jsonRows[ 0 ].crme;
            //     }
            //     this.callback( displayCrme );
            //     this.$close();
            // },
            setCodes: function( codes ) {
                var targetColumn = this.$refs.grid1.getGridView().columnByName( 'crme' );
                var codeList = codes[ 'crmeCd' ];
                var values = [];
                var labels = [];
                codeList.forEach( function( cd ) {
                    var label = '(' + cd.detailCd + ') ' + cd.detailNm;
                    labels.push( label );
                    values.push( cd.detailNm );
                } );

                targetColumn.values = values;
                targetColumn.labels = labels;
                targetColumn.lookupDisplay = true;
                targetColumn.editor = { type: 'dropdown',
                                    domainOnly: true,
                                    textReadOnly: true,
                                    values: values,
                                    labels: labels
                                    };

            },
            selectDfntCrmeList: function() {
                var _this = this;
                http.selectDfntCrmeList( this.data ).then( function( dfntCrme ) {
                //    _this.grid1.rows = dfntCrme;
                    _this.$refs.grid1.setRows( dfntCrme );
                    _this.setDisplayData();
                } );
            },
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

                console.log( modifiedRows );

                http.modifyCrme( rowState ).then( function() {
                    _this.selectDfntCrmeList();
                } );

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
            /*
			* 드롭다운 선택 시 grid에 필드 세팅
			*/
            onDropDownSelected: function() {
                var _this = this;
                this.$refs.grid1.getGridView().onGetEditValue = function ( grid, index, editResult ) {
                    var crmeCd = _this.extractTargetStrings( editResult.text );
                    grid.setValue( index.dataRow, 'crmeCd', crmeCd );
               }
            },
            extractTargetStrings: function( originalString ) {
                var STRIP_PARENTHESES = /\(([^)]+)\)/;
                var targetString = originalString.match( STRIP_PARENTHESES );
                return targetString[ 1 ];
            },
            setFieldsOnRowInserted: function() {
                var _this = this;

                this.$refs.grid1.getDataProvider().onRowInserted = function( provider, row ) {
                    var columns = _this.$refs.grid1.getGridView().getColumns();
                    columns.forEach( function( col ) {
                        if ( !col.visible ) {
                            provider.setValue( row, col.fieldName, _this.data[ col.fieldName ] );
                            _this.$refs.grid1.getGridView().commit( true );
                        }
                    } );
                };
            },
        }
    };
} );
