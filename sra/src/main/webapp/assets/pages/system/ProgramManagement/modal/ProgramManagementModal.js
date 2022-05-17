define( [
    'text!./ProgramManagementModal.html',
    '../ProgramManagementApi'
], function ( template, http ) {
    var HEADER_LAYOUT = [
        {
            name: 'buttonGroup',
            direction: 'horizontal',
            items: [
                'buttonId',
                'buttonNm',
                'useYn'
            ],
            header: {
                text: 'Button Details'
            }
        },
        {
            name: 'authGroup',
            direction: 'horizontal',
            items: [
                'authSystem',
                'authUser'
            ],
            header: {
                text: 'Authentication'
            }
        }
    ];
    return {
        template: template,

        modal: {
            width: 700,
            height: 600
        },

        props: {
            data: { type: Object, required: true }
        },

        data: function () {
            return {
                grid1: {
                    columns: [
                        { fieldName: 'programSeq'  , dataType: 'text' },
                        { fieldName: 'buttonId'    , dataType: 'text', width: '50' , header: { text: 'Button ID' } },
                        { fieldName: 'buttonNm'    , dataType: 'text', width: '100', header: { text: 'Name' } },
                        { fieldName: 'useYn'       , dataType: 'text', width: '50' , header: { text: 'Used' }, defaultValue: 'Y' },
                        { fieldName: 'authSystem'  , dataType: 'text', width: '50' , header: { text: 'Admin Only', styleName: 'multi-line-css' }, defaultValue: 'Y' },
                        { fieldName: 'authUser'    , dataType: 'text', width: '50' , header: { text: 'General', styleName: 'multi-line-css' }, defaultValue: 'Y' }
                    ],
                    rows: []
                },

                commonCodes: [{gridId: 'grid1', fieldName: 'useYn'			, groupCd: 'USE_YN'},
							  {gridId: 'grid1', fieldName: 'authSystem'		, groupCd: 'USE_YN'},
							  {gridId: 'grid1', fieldName: 'authUser'	    , groupCd: 'USE_YN'}]
            };
        },

        mounted: function() {
            this.$refs.grid1.getGridView().setColumnLayout( HEADER_LAYOUT );
            this.getButtonList();
            this.cangeColumnEditableProperty();
            this.setMasterPkOnRowInserted();
        },

        computed: {
            gridSubtitle: function () {
				var length = this.grid1.rows.length;
				return length > 0 ? '' + length : 'No Result';
			}
        },

        methods: {
            close: function() {
                this.$close();
            },

            setCommonCodeList: function() {
				var _this = this;

				if (this.commonCodes.length > 0) {

					http.selectCommonList(this.commonCodes).then(function(list) {

						for (var i = 0; i < list.length; i++) {
							var object = _this.$refs.grid1.getGridView().columnByName(list[i].fieldName);

							object.values = list[i].detailCd;
							object.labels = list[i].detailNm;
							object.lookupDisplay = true;
							object.editor = { type: 'dropdown',
											dropDownCount: list[i].detailCd.length,
											domainOnly: true,
											values: list[i].detailCdY,
											labels: list[i].detailNmY
							};
						}
					} );
				}
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

                modifiedRows.forEach( function( row ) {

					if ( !row.buttonId ) {
						_this.$notify.error( '버튼 ID는 필수 입력값입니다' );
						isValid = false;
						return;
					}
					if ( !row.buttonNm ) {
						_this.$notify.error( '버튼 명은 필수 입력값입니다' );
						isValid = false;
					}
				} );

                if ( isValid ) {
                    http.modifyProgramButton( rowState ).then( function() {
                        _this.getButtonList();
                    } );
                }
            },

            getButtonList: function() {
                var _this = this;

                http.selectProgramButtonList( _this.data ).then( function( buttonInfo ) {
                    _this.grid1.rows = buttonInfo;
                } );
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
				this.$refs.grid1.exportGrid( '버튼목록' );
			},

            /*
			* 현재 선택된 행이 신규 등록된 행인 경우에만 PK 입력 가능 처리
			*/
			cangeColumnEditableProperty: function() {
				var _this = this;

				this.$refs.grid1.getGridView().onCurrentRowChanged = function ( grid, oldRow, newRow ) {
					var curr = grid.getCurrent();
					var rowState = newRow > -1 ? _this.$refs.grid1.getDataProvider().getRowState( newRow ) : "";
					var editable =  ( newRow == -1 && curr.itemIndex > -1) || ( rowState == "created" );
		   			grid.setColumnProperty( 'buttonId', 'editable', editable );
				}
			},

            /*
			* 신규 행 추가 시 마스터 PK 입력
			*/
            setMasterPkOnRowInserted: function() {
                var _this = this;
                this.$refs.grid1.getDataProvider().onRowInserted = function( provider, row ) {
                    provider.setValue( row, 'programSeq', _this.data.programSeq );
                    _this.$refs.grid1.getGridView().commit( true );
                };
            },
        }
    };
} );
