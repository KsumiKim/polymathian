define( [
        'text!./CaseRegistration.html',
        './CaseRegistrationApi',
        './modal/CrmeModal',
        './modal/Modal2',
        'mixins/session-mixin',
        'js-joda',
    ], function ( template, http, CrmeModal, Modal2, sessionMixin, JSJoda ) {
        var LocalDate = JSJoda.LocalDate;
        return {
            template: template,
            mixins: [ sessionMixin ],
            data: function() {
                return {
                    param: {
                        profCd: '001',
                        acptYear: '2021',
                        jgCd: '001',
                        caseSeqno: '1',
                    },
                    form: {
                        profCd: '001',
                        acptYear: '',
                        jgCd: '',
                        caseSeqno: '',
                        pcnYear: LocalDate.now(),
                        cfmYear: LocalDate.now(),
                        rpstCrme: '',
                        rpstAplyLwat: ''
                    },
                    codes: {
                        profCd: [],
                        jgCd: [],
                        authCd: [],
                    },
                    grid1: {
                        columns: [
                            { fieldName: 'profCd'	, dataType: 'text', visible: false },
                            { fieldName: 'acptYear'	, dataType: 'text', visible: false },
                            { fieldName: 'jgCd'	    , dataType: 'text', visible: false},
                            { fieldName: 'dfntCrmeList'	    , dataType: 'object', objectKey: 'crme', visible: false},
                            { fieldName: 'dfntName'	, dataType: 'text', width: '50'	, header: { text: '성명', styleName: 'required-ico' } },
                            { fieldName: 'dfntRrNo'	, dataType: 'text', width: '150', editor: { mask: { editMask: '000000-0000000' } },  textFormat: '([0-9]{6})([0-9]{7});$1-$2', header: { text: '주민번호', styleName: 'required-ico' } },
                            { fieldName: 'crme'		, type: 'data', width: '100', header: { text: '죄명', styleName: 'required-ico' }, button: 'action', buttonVisibility: 'always' },
                            { fieldName: 'aplyLwat'	, dataType: 'text', width: '100', header: { text: '적용법조', styleName: 'required-ico' }, button: 'action' },
                            { fieldName: 'useYn'	, dataType: 'text',	width: '50' , header: { text: '사용여부' } },
                            { fieldName: 'acptCd'	, dataType: 'text', width: '50' , header: { text: '인용여부' } },
                            { fieldName: 'chgDt'	, type: 'datetime', editor: {
                                type: "date",
                                maxLength: 6,
                                yearNavigation: true,
                              }, width: '50'	, header: { text: '청구일자', styleName: 'required-ico' } }
                        ],
                        rows: []
                    },
                    grid2: {
                        columns: [
                            { fieldName: 'profCd'	, dataType: 'text', visible: false },
                            { fieldName: 'acptYear'	, dataType: 'text', visible: false },
                            { fieldName: 'jgCd'	    , dataType: 'text', visible: false},
                            { fieldName: 'dfntName'	, dataType: 'text', width: '50'	, header: { text: '성명', styleName: 'required-ico' } },
                            { fieldName: 'dfntRrNo'	, dataType: 'text', width: '150', editor: { mask: { editMask: '000000-0000000' } },  textFormat: '([0-9]{6})([0-9]{7});$1-$2', header: { text: '주민번호', styleName: 'required-ico' } },
                            { fieldName: 'chgNo'	, dataType: 'text', width: '50'	, header: { text: '청구번호', styleName: 'required-ico' } },
                            { fieldName: 'chgDt'	, dataType: 'text', width: '50'	, header: { text: '청구일자', styleName: 'required-ico' } },
                        ],
                        rows: []
                    },
                    grid3: {
                        columns: [
                            { fieldName: 'flag'	, dataType: 'text' },
                            { fieldName: 'a'	, dataType: 'text' },
                            { fieldName: 'b'	, datetimeFormat: 'yyyy.MM.dd', editor: { type: "date", maxLength: 6, yearNavigation: true, datetimeFormat: 'yyyy.MM.dd' } },
                            { fieldName: 'c'	, dataType: 'number', editor: { type: 'number', editFormat: '#,##0', integerOnly: true },
                            //     displayCallback: function(grid, index, value) {
                            //     var dpValue = value;

                            //     if ( value % 1 != 0 ) {
                            //         dpValue = value.toFixed( 2 ) + '...';
                            //     }

                            //     return dpValue;
                            //   },
                            footer: { expression: 'sum', suffix: '%' } },
                            { fieldName: 'd'	, dataType: 'data', numberFormat: "#,##0", editor: { type: 'number', editFormat: '#,##0', integerOnly: true },
                                displayCallback: function(grid, index, value) {
                                var dpValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');;
                                return dpValue;
                              }, }
                        ],
                        rows: []
                    },
                    fruitList: [
                        { name: '바나나', value: 'A' },
                        { name: '사과', value: 'Y' },
                        { name: '멜론', value: 'N' }
                    ],
                    codeList: [
                        { name: 'aaa', value: 'aaa' },
                        { name: 'bbb', value: 'bbb' },
                        { name: 'ccc', value: 'ccc' },
                        { name: 'ddd', value: 'ddd' },
                        { name: 'eee', value: 'eee' },
                        { name: 'fff', value: 'fff' },
                        { name: 'ggg', value: 'ggg' },
                        { name: 'hhh', value: 'hhh' },
                        { name: 'iii', value: 'iii' },
                        { name: 'jjj', value: 'jjj' },
                        { name: 'kkk', value: 'kkk' },
                        { name: 'lll', value: 'lll' },
                        { name: 'mmm', value: 'mmm' },
                        { name: 'ooo', value: 'ooo' },
                        { name: 'ppp', value: 'ppp' },
                        { name: 'qqq', value: 'qqq' },
                        { name: 'rrr', value: 'rrr' },
                        { name: 'sss', value: 'sss' },
                        { name: 'ttt', value: 'ttt' },
                        { name: 'uuu', value: 'uuu' },
                        { name: 'vvv', value: 'vvv' },
                        { name: 'www', value: 'www' },
                        { name: 'xxx', value: 'xxx' }
                    ],
                    radioGroup1: {
                        value: null
                    },
                    selected: null,
                    selected2: '',
                    showColumns: true,
                    btnLabel: '숨기기',
                    hasValue: true,
                    list: [
                        {mrgCaseAcptYear: 2020, mrgCaseJgCd: 1, mrgCaseSeqno: 1234},
                        {mrgCaseAcptYear: 1994, mrgCaseJgCd: 2, mrgCaseSeqno: 1236},
                        {mrgCaseAcptYear: 2020, mrgCaseJgCd: 1, mrgCaseSeqno: 1235},
                    ],
                    list1: [
                        {flag: 'Y', a: 123, b: '20220306', c: 10000, d: 100000},
                        {flag: 'N', a: 456, b: '20220305', c: 20000, d: 100000},
                        {flag: 'N', a: 789, b: '20220304', c: 20000, d: 100000},
                        {flag: 'Y', a: 101, b: '20220303', c: 20000, d: 100000},
                    ],
                    isValid: true,
                    message: ''
                }
            },
            watch: {
                selected: function() {
                    console.log( this.selected );
                },
                showColumns: function() {
                    this.btnLabel = this.showColumns ? '숨기기' : '보이기';
                },
                selectedJgCd: function() {
                    var _this = this;

                    console.log( 'selected ===> ', this.selectedJgCd );
                    http.selectChildCodeList( { authCd: { groupCd: 'AUTH_CD', option01: this.selectedJgCd } } )
                        .then( function( authCd ) {
                            _this.setCodes( authCd );
                         } );
                },
                hasValue: function() {
                    console.log(this.hasValue);
                }
            },
            mounted: function () {
                var _this = this;

                //this.setCodes( { profCd: profCd, jgCd: jgCd } );
                this.setFieldsOnRowInserted();
                this.onCellClicked();
                // this.setColumnProperty();

                // this.$refs.grid3.getGridView().setRowStyleCallback( function( grid, item, fixed ) {
                //     var returnObj = {};
                //     var flag = grid.getValue( item.index, 'flag' );

                //     if ( flag === 'N' ) {
                //         returnObj.editable = false
                //     }
                //     return returnObj;
                // });
                this.grid3.rows = this.list1;

                this.$refs.grid3.getGridView().onCurrentChanged = function(grid, newIndex){
                    var check = grid.isCheckedItem(newIndex.itemIndex);

                    if ( newIndex.column === 'flag' ) {
                        grid.setColumnProperty( 'flag', 'editable', false );
                    }
                };

                var styleCallbackFn = function( grid, model ){
                    if ( !_this.isValid ) {
                        return { styleName: 'yellow-column' }
                    }
                }
                this.$refs.grid3.getGridView().columnByName( 'c' ).styleCallback = styleCallbackFn;
                this.$refs.grid3.getGridView().onCellEdited = function ( grid, itemIndex, row, field ) {
                    var jsonRows = grid.getJsonRows();
                    var total = 0;

                    jsonRows.forEach( function( data ) {
                        total += data.c;
                    } );
                    console.log(jsonRows);
                    if ( total > 100 ) {
                        _this.isValid = false;
                    }
                }

            },
            computed: {
                grid1Subtitle: function () {
                    var length = this.grid1.rows.length;
                    return length > 0 ? '' + length : '데이터가 없습니다';
                },
                selectedJgCd: function() {
                    return this.param.jgCd;
                },
                nullText: function() {
                    return this.session.userAuth === 'AUTH_SYSTEM' ? '전체' : null
                }
            },
            methods: {
                openModal2: function() {
                    this.openModal( Modal2, {}, function( returnValue ) {
                        console.log( returnValue );
                    } );
                },
                moveUp: function() {
                    var curr = this.$refs.grid3.getGridView().getCurrent();
                    if ( curr.dataRow == 0 ) {
                        return;
                    }

                    var currentData = this.$refs.grid3.getGridView().getValues( curr.dataRow );
                    var prevData = this.$refs.grid3.getGridView().getValues( curr.dataRow - 1 );

                    this.$refs.grid3.getGridView().setValues( curr.dataRow, Object.assign( prevData, { c: curr.dataRow } ) );
                    this.$refs.grid3.getGridView().setValues( curr.dataRow - 1, Object.assign( currentData, { c: curr.dataRow - 1 } ) );
                    this.$refs.grid3.getGridView().commit();
                },
                moveDown: function() {
                    var jsonRows = this.$refs.grid3.getGridView().getJsonRows();
                    var curr = this.$refs.grid3.getGridView().getCurrent();
                    if ( curr.dataRow == jsonRows.length - 1 ) {
                        return;
                    }

                    var currentData = this.$refs.grid3.getGridView().getValues( curr.dataRow );
                    var nextData = this.$refs.grid3.getGridView().getValues( curr.dataRow + 1 );
                    this.$refs.grid3.getGridView().setValues( curr.dataRow, Object.assign( nextData, { c: curr.dataRow } ) );
                    this.$refs.grid3.getGridView().setValues( curr.dataRow + 1, Object.assign( currentData, { c: curr.dataRow + 1 } ) );
                    this.$refs.grid3.getGridView().commit();
                },
                sortList: function() {
                    /*
                    {mrgCaseAcptYear: 2021, mrgCaseJgCd: 1, mrgCaseSeqno: 1234},
                    {mrgCaseAcptYear: 1994, mrgCaseJgCd: 2, mrgCaseSeqno: 1236},
                    {mrgCaseAcptYear: 2020, mrgCaseJgCd: 1, mrgCaseSeqno: 1235},
                    */
                    this.list.sort( function( a, b ) {
                        if ( a.mrgCaseAcptYear < b.mrgCaseAcptYear ) {
                            return -1;
                        } else if ( a.mrgCaseAcptYear > b.mrgCaseAcptYear ) {
                            return 1;
                        }

                        if ( a.mrgCaseJgCd < b.mrgCaseJgCd ) {
                            return -1;
                        } else if ( a.mrgCaseJgCd > b.mrgCaseJgCd ) {
                            return 1;
                        }

                        if ( a.mrgCaseSeqno < b.mrgCaseSeqno ) {
                            return -1;
                        } else if ( a.mrgCaseSeqno > b.mrgCaseSeqno ) {
                            return 1;
                        }

                        return 1;
                    } );
                },
                setColumnProperty: function() {

                    this.$refs.grid1.getGridView().setRowStyleCallback( function( grid, item, fixed ) {
                        var flag = grid.getValue( item.index, 'flag' );
                        return { editable: flag === 'Y' };
                    });

                },
                init: function() {
                    this.grid1.rows = [];
                    this.param.name = '';
                    this.pageInfo = {};
                },
                setCodes: function( codes ) {
                    var _this = this;

                    Object.keys( codes ).forEach( function( cd ) {
                        _this.codes[ cd ] = codes[ cd ].map( function( c ) {
                            return { name: c.detailNm, value: c.detailCd };
                        } );
                    } );
                },
                save: function() {
                    this.$refs.grid1.getGridView().commit( true );
                    // this.validateForm();
                    console.log( this.param );

				    var rowState = this.$refs.grid3.getModifiedRowState();
                    console.log( rowState );

                    rowState.updated.forEach( function( modifiedRow ) {
                        var replacedDate = modifiedRow.b.replace( /\D*/g, '' );
                        console.log( replacedDate );
                        if ( replacedDate.length > 8 ) {
                            console.log( '최대 8자리' );
                        }
                        var replacedNumber = modifiedRow.d.toString().replace( /\D*/g, '' );
                        console.log( replacedNumber );


                    });

                    if ( !this.form.acptYear || !this.form.caseSeqno ) {
                        this.hasValue = false;
                        return;
                    }
                    // 저장

                },
                validateForm: function() {
                    var requiredInputs = [ this.form.acptYear, this.form.caseSeqno ];
                    this.hasValue = requiredInputs.every( function( input ) {
                        return !!input;
                    } );
                },
                search: function() {
                    var _this = this;

                    // http.selectCase( this.param ).then( function( caseInfo ) {
                    //     _this.form = Object.assign( caseInfo, { pcnYear: LocalDate.parse( caseInfo.pcnYear ),
                    //     cfmYear: LocalDate.parse( caseInfo.cfmYear ) } );
                    // } );

                    // http.selectDfntList( this.param ).then( function( dfntInfo ) {
                    //     _this.grid1.rows = dfntInfo;
                    //     // _this.$refs.grid1.setRows( dfntInfo );
                    // } );

                },
                toggleColumns: function() {
                    this.showColumns = !this.showColumns;
                    console.log( this.showColumns );
                    this.$refs.grid1.getGridView().columnByName( 'crme' ).visible = this.showColumns;
                    this.$refs.grid1.getGridView().columnByName( 'aplyLwat' ).visible = this.showColumns;
                },
                /*
                * 그리드 행 추가
                */
                insertGrid1Row: function() {
                    this.$refs.grid1.createAppendRow();
                },
                /*
                * 그리드 행 삭제
                */
                deleteGrid1Row: function() {
                    this.$refs.grid1.setDeleteRowState();
                },
                /*
                * 그리드 엑셀 다운로드
                */
                excelDownloadGrid1: function() {
                    this.$refs.grid1.exportGrid( '피고인 목록' );
                },
                /*
                * 그리드 행 추가
                */
                insertGrid2Row: function() {
                    this.$refs.grid2.createAppendRow();
                },
                /*
                * 그리드 행 삭제
                */
                deleteGrid2Row: function() {
                    this.$refs.grid2.setDeleteRowState();
                },
                /*
                * 그리드 엑셀 다운로드
                */
                excelDownloadGrid2: function() {
                    this.$refs.grid1.exportGrid( '환수 목록' );
                },
                /*
                * 신규 행 추가 시 필드 입력
                */
                setFieldsOnRowInserted: function() {
                    var _this = this;

                    this.$refs.grid1.getDataProvider().onRowInserted = function( provider, row ) {
                        var columns = _this.$refs.grid1.getGridView().getColumns();
                        columns.forEach( function( col ) {
                            if ( !col.visible ) {
                                provider.setValue( row, col.fieldName, _this.form[ col.fieldName ] );
                                _this.$refs.grid1.getGridView().commit( true );
                            }
                        } );
                    };
                },
                onCellClicked: function() {
                    var _this = this;

                    this.$refs.grid1.getGridView().onCellButtonClicked = function( grid, index, column ) {

                        var data = _this.$refs.grid1.getGridView().getValues( index.dataRow );

                        if ( column.fieldName === 'crme' ) {
                            _this.openModal( CrmeModal, data, function( returnValue ) {
                                grid.setValue( index.dataRow, column.fieldName, returnValue );
                            } );
                        }

                        if ( column.fieldName === 'aplyLwat' ) {
                        }
                    };
                },
                openModal: function( modal, data, callback ) {
                    this.$showModal( modal, {
                        data: data,
                        callback: callback
                    } );
                }
            }
        }
  } );
