define( [
    'realgrid',
    'mixins/grid-data-provider-mixin'
], function ( RealGrid, gridDataProviderMixin ) {
    var emptyArray = function () { return []; }
    return {
        name: 'ts-grid',
        mixins: [ gridDataProviderMixin ],
        props: {
            value: { type: Array, default: emptyArray },
            columns: { type: Array, default: emptyArray },
            fitStyle: { type: String, default: 'even' },
            headerHeight: { type: Number, default: 30 },
        },
        data: function () {
            return {
                /** @protected */
                internalGridView: null
            };
        },
        computed: {
            classes: function () {
                return {
                    'ts-grid': true
                };
            }
        },
        watch: {
            value: 'setRows',
            columns: 'setColumns'
        },
        mounted: function () {
            this.internalGridView = new RealGrid.GridView( this.$refs.grid );
            this.internalGridView.setEditOptions( {
                appendable: true,
                insertable: true,
                editable: true,
                softDeleting: true
            } );
            this.setColumns( this.columns );
            this.internalGridView.displayOptions.fitStyle = this.fitStyle;
            this.internalGridView.header.height = this.headerHeight;

            this.dataProvider = this.getDataProvider();
            this.setFields( this.fields );
            this.setRows( this.value );

            this.internalGridView.setDataSource( this.dataProvider );
        },
        methods: {
            /** @public */
            getGridView: function () {
                return this.internalGridView;
            },
            /** @public */
            setColumns: function ( columns ) {
                columns.forEach( function ( column ) {
                    if ( column.type === undefined ) {
                        column.type = 'data';
                    }

                    if ( column.name === undefined ) {
                        column.name = column.fieldName;
                    }
                } );
                this.internalGridView.setColumns( columns );
            },
            getModifiedRowState: function() {
                var _this = this;
                var dataProvider = this.getDataProvider();

                var updatedIndices = dataProvider.getStateRows( 'updated' );
                var createdIndices = dataProvider.getStateRows( 'created' );
                var deletedIndices = dataProvider.getStateRows( 'deleted' );

                var updatedList = updatedIndices.map( function( index ) {
					 return _this.internalGridView.getValues( index );
				} );
                var createdList = createdIndices.map( function( index ) {
					return _this.internalGridView.getValues( index );
				} );
                var deletedList = deletedIndices.map( function( index ) {
					return _this.internalGridView.getValues( index );
				} );

                return {
                    updated: updatedList,
                    created: createdList,
                    deleted: deletedList
                };
            },
            setDeleteRowState: function( force ) {
				this.internalGridView.commit( true );
                if ( force === undefined ) {
                    force = true;
                }
                var dataProvider = this.getDataProvider();
				dataProvider.setRowStates( this.internalGridView.getCheckedRows(), 'deleted', force );
            },
            createAppendRow: function() {
				this.internalGridView.commit( true );
				this.internalGridView.beginAppendRow();
				this.internalGridView.showEditor();
				this.internalGridView.setFocus();
            },
            exportGrid: function( fileName, extension, done ) {
				this.internalGridView.commit( true );
                extension = extension || 'cell';

                var _this = this;
				this.internalGridView.exportGrid({
					type: "excel",
					target: "local",
					fileName: fileName + '.' + extension,
					showProgress: true,
					progressMessage: "파일 다운로드 중입니다.",
					indicator: true,
					header: true,
					footer: true,
					compatibility: true,
					done: done || function() {
    					_this.$notify.success( '파일 다운로드가 완료되었습니다.' );
                    }
				});
            }
        },
        render: function ( h ) {
            return h( 'div', {
                class: this.classes,
                ref: 'grid'
            } );
        }
    };
} );