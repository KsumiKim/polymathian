define( [
    'text!./MenuManagement.html',
    './MenuManagementApi',
    './modal/MenuManagementModal'
], function ( template, http, MenuManagementModal ) {
    return {
        template: template,
        code: function () {
            return {
                AUTH_CD_ALL: { groupCd: 'AUTH_CD' },
                AUTH_CD_ONLY_USE: { groupCd: 'AUTH_CD', useYn: 'Y' },
                MY_FAVORITE_CODE: { groupCd: 'USE_YN' }
            };
        },
        data: function () {
            return {
                param: {
                    name: ''
                },
                hyperText: '',
                tabValue: 'B',
                grid1: {
                    columns: [
                        { fieldName: 'id', dataType: 'text', width: '100', header: { text: '아이디' } },
                        { fieldName: 'name', dataType: 'text', width: '100', header: { text: '메뉴명' } }
                    ],
                    rows: []
                },
                page: 1,
                pages: 2,
                navigatePages: 5,
                pageInfo: {
                    pages: 3,
                    navigatepageNums: []
                }
            }
        },
        mounted: function ( AUTH_CD_ALL, MY_FAVORITE_CODE, AUTH_CD_ONLY_USE ) {
            var gridView = this.$refs.grid1.getGridView();
            gridView.onCellClicked = function (grid, clickData) {
                var row = grid.getValues( clickData.itemIndex );
            };
        },
        methods: {
            openModal: function () {
                this.$showModal( MenuManagementModal );
            },
            init: function () {
                this.param.name = '';
            },
            search: function () {
                var _this = this;
                // http.selectMenuList( '임꺽정' );
                http.selectPageMenuList( this.param.name, this.page, this.pages, this.navigatePages ).then( function ( pageInfo ) {
                    _this.pageInfo = pageInfo;
                    _this.grid1.rows = pageInfo.list;
                    this.$notify.success( '조회되었습니다.' );
                } );
            },
            save: function () {
                var gridView = this.$refs.grid1.getGridView();
                gridView.commit();
            },
            delete: function () {
                alert( '삭제' );
            },
            정말로링크가동작하는지테스트해본다: function () {
                var 이것은링크의대상과메세지를전달하기위한지정된객체정보이다 = {
                    // 메뉴ID
                    id: 12,
                    // 메뉴ID에 해당하는 화면에서 전달받을 파라미터
                    data: { '영문과 한글의 차이는 컴퓨터에겐 결국 0과 1로 이루어진 현상일뿐인다': 1 | 0 }
                };
                this.$emit( 'link', 이것은링크의대상과메세지를전달하기위한지정된객체정보이다 );
            }
        }
    };
} );