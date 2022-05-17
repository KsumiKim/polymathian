define( [
    'text!./GridComponent.html'
], function ( template ) {
    return {
        template: template,
        data: function () {
            return {
                grid1: {
                    columns: [
                        { fieldName: 'id', dataType: 'text', width: '100', header: { text: '아이디' } },
                        { fieldName: 'name', dataType: 'text', width: '100', header: { text: '이름' } }
                    ],
                    rows: []
                }
            };
        },
        computed: {
            gridHeight: function () {
                return {
                    height: '300px'
                };
            }
        },
        methods: {
            insertRows: function () {
                this.grid1.rows = [
                    { id: 'A', name: '' + Math.random() },
                    { id: 'D', name: '' + Math.random() },
                    { id: 'C', name: '' + Math.random() }
                ];
            }
        }
    };
} );