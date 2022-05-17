define([
    'text!./TsFileUpload.html'
], function( template ) {
        return {
            name: 'ts-file-upload',

            template: template,

            props: {
                multiple: { type: Boolean, default: false },
                accept: String,
                files: { type: Array, default: function () { return []; } }
            },

            data: function () {
                return {};
            },

            methods: {
                openFileBrowser: function () {
                    this.$refs.file.click();
                },
                onFileChange: function() {
                    var _this = this;
                    var uploaded = this.$refs.file.files;

                    uploaded.forEach( function( file, idx ) {
                        _this.files.push( {
                            id: idx,
                            name: file.name,
                            lastModified: file.lastModified,
                            size: file.size
                        } );
                    } );
                },

                onSelectFiles: function ( files ) {
                    this.$emit( 'select-files', files );
                },

                uploadFile: function() {
                    // TODO: 서버에 파일 업로드
                    alert( '선택한 파일 서버 업로드 \n' + JSON.stringify( this.files, null, 2 ) );
                },

                deleteFile: function( selectedFile ) {
                    this.files = this.files.filter( function( file ) {
                        return file.id !== selectedFile.id;
                    } );
                }
            },
        };
});