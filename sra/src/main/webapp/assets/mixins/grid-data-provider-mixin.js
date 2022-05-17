define( [
    'realgrid'
], function ( RealGrid ) {
    return {
        props: {
            fields: { type: Array, default: function () { return []; } }
        },
        data: function () {
            return {
                /** @protected */
                dataProvider: null
            };
        },
        watch: {
            fields: 'setFields'
        },
        methods: {
            /** @public */
            getDataProvider: function () {
                if ( this.dataProvider === null ) {
                    this.dataProvider = this.createInternalDataProvider();
                }
                return this.dataProvider;
            },
            /** @public */
            setFields: function ( fields ) {
                this.dataProvider.setFields( fields );
            },
            /** @public */
            setRows: function ( rows ) {
                this.dataProvider.setRows( rows );
            },
            /** @private */
            createInternalDataProvider: function () {
                return new RealGrid.LocalDataProvider( false );
            }
        }
    };
} );