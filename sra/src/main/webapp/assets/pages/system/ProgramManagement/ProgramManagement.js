define( [
  'text!./ProgramManagement.html',
  './ProgramManagementApi',
  './modal/ProgramManagementModal'
], function ( template, http, ProgramManagementModal ) {
	var HEADER_LAYOUT = [
		{
			name: 'programInfo',
			direction: 'horizontal',
			items: [
				'programSeq',
				'showDetail',
				'programNm',
				'programPath',
				'useYn'
			],
			header: {
				text: 'Program Details'
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

		data: function() {
			return {
				param: {
					name: ''
				},

				grid1: {
					columns: [
						{ fieldName: 'programSeq'		, dataType: 'text', width: '50'	, header: { text: 'Program ID', styleName: 'multi-line-css' }, editable: false },
						{ fieldName: 'showDetail'		, dataType: 'data', width: '30'	, header: { text: 'Show\nDetail', styleName: 'multi-line-css' }, renderer: { type: 'image',	imageCallback: function ( grid, cell ) { return 'assets/img/searchIco.png'; }, imageHeight: 10 } },
						{ fieldName: 'programNm'		, dataType: 'text', width: '150', header: { text: 'Name' } },
						{ fieldName: 'programPath'		, dataType: 'text', width: '150', header: { text: 'Path' } },
						{ fieldName: 'useYn'			, dataType: 'text',	width: '50' , header: { text: 'Used' } },
						{ fieldName: 'authSystem'		, dataType: 'text', width: '50' , header: { text: 'Admin Only' }, defaultValue: 'Y' },
						{ fieldName: 'authUser'			, dataType: 'text', width: '50' , header: { text: 'General' }, defaultValue: 'Y' },
						],
					rows: []
				},

				page: 1,
				pages: 20,
				navigatePages: 3,
				pageInfo: { },

				commonCodes: [{gridId: 'grid1', fieldName: 'useYn'			, groupCd: 'USE_YN'},
							  {gridId: 'grid1', fieldName: 'authSystem'		, groupCd: 'USE_YN'},
							  {gridId: 'grid1', fieldName: 'authUser'		, groupCd: 'USE_YN'} ]
			}
		},

		watch: {
			page: function() {
				this.search();
			}
		},

		mounted: function () {
			// 칼럼 헤더 그룹핑
			this.$refs.grid1.getGridView().setColumnLayout( HEADER_LAYOUT );
			this.openModalOnCellClicked();
		},

		computed: {
			gridSubtitle: function () {
				var length = this.grid1.rows.length;
				return length > 0 ? '' + length : 'No Result';
			}
		},

		methods: {

			init: function() {
				this.$refs.grid1.getGridView().commit( true );
				this.grid1.rows = [];
				this.param.name = '';
				this.pageInfo = {};
			},

			search: function() {
				this.$refs.grid1.getGridView().commit( true );
				var _this = this;

				http.selectProgramList( this.param.name, this.page, this.pages, this.navigatePages ).then( function ( pageInfo ) {
					_this.pageInfo = pageInfo;
					_this.grid1.rows = pageInfo.list;
				} );
			},

			openModalOnCellClicked: function() {
				var _this = this;

				this.$refs.grid1.getGridView().onCellClicked = function ( grid, clickData ) {

				// '상세 보기'가 선택되면 모달창 열기
				if ( clickData.cellType !== 'header' &&  clickData.fieldName === 'showDetail' ) {
					var data = grid.getValues( clickData.itemIndex );

					// 마스터 PK가 저장되지 않은 상태에서 디테일 Modal 창 오픈 불가
					if ( !data.programSeq ) {
						_this.$notify.error( '프로그램 등록이 완료되어야 합니다.' );
					}

					// $showModal의 두번째 인자로 자식 컴포넌트에서 필요한 부모 컴포넌트의 데이터를 전부 전달
					_this.$showModal( ProgramManagementModal, {
							data: data
						} );
					}
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

					if ( !row.programNm ) {
						_this.$notify.error( '프로그램 명은 필수 입력값입니다' );
						isValid = false;
						return;
					}
					if ( !row.programPath ) {
						_this.$notify.error( '프로그램 경로는 필수 입력값입니다' );
						isValid = false;
					}
				} );

				if ( isValid ) {
					http.modifyProgram( rowState ).then(function() {
						_this.search();
					} );
				}
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
				this.$refs.grid1.exportGrid( '프로그램목록' );
			},

			link: function ( 내입장에서모르지만그어떤익명의누군가는나에게메시지를전달한다 ) {
				console.log( 내입장에서모르지만그어떤익명의누군가는나에게메시지를전달한다[ '영문과 한글의 차이는 컴퓨터에겐 결국 0과 1로 이루어진 현상일뿐인다' ] );
				var menuId = 13;
				this.$emit('menu:detach', menuId);
			}
		}
	}
} );
