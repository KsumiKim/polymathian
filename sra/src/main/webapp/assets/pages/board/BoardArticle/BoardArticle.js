define( [
    'text!./BoardArticle.html',
    './BoardArticleApi',
    'mixins/session-mixin',
    'js-joda',
], function ( template, http, sessionMixin, JSJoda ) {
    var LocalDate = JSJoda.LocalDate;
    return {
        template: template,
        mixins: [ sessionMixin ],
        data: function() {
            return {
                param: {
                    articleCd: '',
                    title: '',
                    writer: ''
                },
                grid1: {
                    columns: [
                        { fieldName: 'boardId'	        , visible: false },
                        { fieldName: 'articleId'	    , visible: false },
                        { fieldName: 'articleCd'	    , editable: false, width: '70' , header: { text: 'Category' } },
                        { fieldName: 'title'	        , editable: false, width: '150', header: { text: 'Title' } },
                        { fieldName: 'insertNm'	        , editable: false, width: '70' , header: { text: 'Writer' } },
                        { fieldName: 'insertDt'	        , editable: false, width: '70' , header: { text: 'Published Date' }, dataType: 'datetime', datetimeFormat: 'yyyy-MM-dd' },
                    ],
                    rows: []
                },
                selectedArticle: {},

                page: 1,
				pages: 15,
				navigatePages: 3,
				pageInfo: { },
            }
        },
            watch: {
                page: function() {
                    this.search();
                }
            },
            mounted: function (  ) {
                this.setGrid();
                this.setGridEvent();
                this.search();
            },
            computed: {
                grid1Subtitle: function () {
                    var length = this.grid1.rows.length;
                    return length > 0 ? '' + length : 'No Result';
                }
            },
            methods: {
                setGrid: function() {
                    this.$refs.grid1.getGridView().setStateBar({ visible: false });
                    this.$refs.grid1.getGridView().setCheckBar({ visible: false });
                    this.$refs.grid1.getGridView().setDisplayOptions({ selectionMode: 'single' });
                    this.$refs.grid1.getGridView().setDisplayOptions({ rowHeight: '40' });
                },
                search: function() {
                    var _this = this;

                    http.selectArticleList( this.page, this.pages, this.navigatePages, this.param ).then( function ( pageInfo ) {
                        _this.pageInfo = pageInfo;
                        _this.grid1.rows = pageInfo.list;
                    } );
                },
                setGridEvent: function() {
                    var self = this;
                    this.$refs.grid1.getGridView().onCellDblClicked  = function( grid, clickData ) {
                        var data = grid.getValues( clickData.itemIndex );

                        http.selectArticle( data ).then( function ( article ) {
                            self.selectedArticle = article;
                        } );
                    }
                }
            }
        }
  } );
