define( [], function () {
    var originalMethods = [
        'beginAppendRow',
        'beginInsertRow',
        'beginUpdateRow',
        'collapseAll',
        'collapseGroup',
        'collapseParent',
        'expandAll',
        'expandGroup',
        'expandParent',
        'getCheckedItems',
        'getCheckedRows',
        'getGroupFieldNames',
        'getGroupFields',
        'getGroupIndex',
        'getGroupingOptions',
        'getGroupLevel',
        'getGroupLevels',
        'getGroupPanel',
        'getOptions',
        'getPage',
        'getPageCount',
        'getRowGroup',
        'groupBy',
        'isGrouped',
        'isGroupItem',
        'isMergedGrouped',
        'isParentVisible',
        'setGroupingOptions',
        'setGroupPanel',
        'setOptions',
        'setPage',
        'setPageCount',
        'setPaging',
        'setRowGroup'
    ];
    var methods = {};
    originalMethods.forEach( function ( method ) {
        methods[ method ] = function () {
            var gridView = this.getGridView();
            return gridView[ method ].apply( gridView, arguments );
        };
    } );
    return {
        methods: Object.assign( methods, {
            /** @abstract */
            getGridView: function () {}
        } )
    };
} );