define( [
  'text!./FileManagement.jsp',
  './FileManagementApi',
], function ( template, http ) {

    return {
        template: template,

        data: function() {
            return {
                board: {
                    title: '',
                    text: ''
                },
                /*
                 * DB에서 가져온 파일 JSON 정보 또는 DOM File 객체
                 */
                files: []
            }
        },

        computed: {
            styles: function () {
                return {
                    height: '300px'
                };
            }
        },

        mounted: function () { },

        methods: {
            onSelectFiles: function ( files ) {
                console.log( files );
            },

            deleteFile: function( file ) {
                // TODO: 파일 정보(파일 , 경로 등)를 바탕으로 서버에서 파일 삭제
                alert( '파일 삭제 \n' + JSON.stringify( file, null, 2 )  );
            },

            downloadFile: function( file ) {
                // TODO: 파일 정보(파일 명, 경로 등)를 바탕으로 서버에서 파일 다운로드
                alert( '파일 다운로드 \n' + JSON.stringify( file, null, 2 ) );
            },

            save: function () {
                http.uploadFiles( this.board, this.files );
            }
        }
    }
} );
