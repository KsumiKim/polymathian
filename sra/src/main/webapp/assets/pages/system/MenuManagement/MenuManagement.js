define( [
  'text!./MenuManagement.html',
  './MenuManagementApi'
], function ( template, http ) {

	return {
		template: template,

		data: function() {
			return {
				grid1: {
					columns: [
							{ fieldName: 'menuNm',       dataType: 'text', width: '100', header: { text: '메뉴명' } },
							{ fieldName: 'menuDesc',     dataType: 'text', editable: false, width: '100', header: { text: '메뉴설명' } },
							{ fieldName: 'depth',        dataType: 'text', editable: false, width: '100', header: { text: '메뉴단계' } },
							{ fieldName: 'sortNum',      dataType: 'text', editable: false, width: '100', header: { text: '정렬순서' } },
							{ fieldName: 'useYn',        dataType: 'text', editable: false, width: '100', header: { text: '사용유무' } },
							{ fieldName: 'programSeq',   dataType: 'text', editable: false, width: '100', header: { text: '프로그램 순번' } },
							{ fieldName: 'programNm',    dataType: 'text', editable: false, width: '100', header: { text: '프로그램명' } },
							{ fieldName: 'menuSeq',      dataType: 'text', editable: false, visible : false, width: '100', header: { text: '메뉴순번' } },
							{ fieldName: 'upperMenuSeq', dataType: 'text', editable: false, visible : false, width: '100', header: { text: '상위순번' } },
						],
						rows: []
				},

				grid2: {
					columns: [

							{ fieldName: 'menuNm',       dataType: 'text', width: '100', header: { text: '메뉴명' } },
							{ fieldName: 'menuDesc',     dataType: 'text', width: '100', header: { text: '메뉴설명' } },
							{ fieldName: 'sortNum',      dataType: 'text', width: '100', header: { text: '정렬순서' } },
							{ fieldName: 'useYn',        dataType: 'text', width: '100', header: { text: '사용유무' } },
							{ fieldName: 'programSeq',   dataType: 'text', width: '100', header: { text: '프로그램 순번' } },
							{ fieldName: 'programNm',    dataType: 'text', width: '100', header: { text: '프로그램명' } },
							{ fieldName: 'menuSeq',      dataType: 'text', editable: false, visible : true, width: '100', header: { text: '메뉴순번' } },
							{ fieldName: 'upperMenuSeq', dataType: 'text', editable: false, visible : true, width: '100', header: { text: '상위순번' } },
							{ fieldName: 'depth',        dataType: 'text', editable: false, visible : true,width: '100', header: { text: '메뉴단계' } },
						],
						rows: []
				},
			}
		},

		watch: {
			page: function() {
				this.search();
			}
		},

		mounted: function () {
			this.gridSetting();
			this.onGridCellClicked();
		},

		computed: {
			gridSubtitle1: function () {
				var length = this.grid1.rows.length;
				return length > 0 ? '' + length : '데이터가 없습니다';
			},

			gridSubtitle2: function () {
				var length = this.grid2.rows.length;
				return length > 0 ? '' + length : '데이터가 없습니다';
			},
		},

		methods: {
			init: function() {

			},
			/**
			 * grid1, grid2 기본구성
			 */
			gridSetting: function(){

				var getGrid1View = this.$refs.grid1.getGridView();
				var getGrid2View = this.$refs.grid2.getGridView();

				getGrid1View.header.height = 30;
				getGrid2View.header.height = 30;

				getGrid1View.setStateBar({visible: false});
				getGrid1View.setCheckBar({visible: false});

				getGrid1View.sortingOptions.enabled = false;

			},
			/**
			 * 메인 사용자메뉴 조회
			 */
			search: function() {
				var _this = this;

				http.selectMainMenu().then( function ( list ) {
					_this.grid1.rows = list;

					list.forEach(function(row,idx){

					});

				} );
			},

			/**
			 *  사용자메인 메뉴 클릭시
			 */
			onGridCellClicked: function() {
				var _this = this;

				this.$refs.grid1.getGridView().onCellClicked = function ( grid, clickData ) {
					if ( clickData.cellType !== 'header' ){
						var data = grid.getValues( clickData.itemIndex );
							http.selectSubMenu(data).then(function(list){
								_this.grid2.rows = list;
						});
					}
				}
			},

			/**
			 * 사용자서브 메뉴정보 저장
			 */
			save: function() {
				var _this = this;

				this.$refs.grid2.getGridView().commit( true );
				var rowState = this.$refs.grid2.getModifiedRowState();

				// TODO: validation 체크
				http.modifyProgram( rowState ).then(function() {
					_this.search();
				});
			},

			insertGridRow: function() {
				this.$refs.grid2.createAppendRow();
			},

			deleteGridRow: function() {
				this.$refs.grid2.setDeleteRowState();
			},

			excelDownloadGrid: function() {
				this.$refs.grid2.exportGrid( '사용자메뉴' );
			},

		}
	}
} );
