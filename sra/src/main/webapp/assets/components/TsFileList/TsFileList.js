define([
    'components/TsBtn/TsBtn'
], function ( TsBtn ) {
        return {
            name: 'ts-file-list',

            props: {
                multiple: { type: Boolean, default: false },
                accept: String,
                value: { type: Array, required: true }
            },

            data: function () {
                return {
                    lazyFiles: this.value
                }
            },

            computed: {
                files: {
                    get: function () {
                        return this.lazyFiles;
                    },
                    set: function ( value ) {
                        this.lazyFiles = value;
                        this.$emit( 'input', this.lazyFiles );
                    }
                }
            },

            watch: {
                value: function ( val ) {
                    this.lazyFiles = val;
                }
            },

            methods: {
                genFileIcon: function() {
                    return this.$createElement( 'span', {
                        staticClass: 'material-icons align-middle photo_library',
                        style: {
                            marginRight: '10px',
                            cursor: 'initial'
                        }
                    }, [ '' ] );
                },

                genDeleteIcon: function( file ) {
                    var _this = this;
                    return this.$createElement( 'span', {
                        staticClass: 'material-icons align-middle user-select-none',
                        on: {
                            click: function ( e ) {
                                console.log( file );
                                console.log( _this.files );

                                var fileIdx = _this.files.findIndex( function( fileObj ) {
                                    return fileObj === file;
                                } );
                                _this.files.splice( fileIdx, 1 );
                            }
                        }
                    }, [ 'delete' ] );
                },

                genFileInfo: function( file ) {
                    var _this = this;
                    return this.$createElement( 'span', {
                        staticClass: 'd-flex flex-column flex-grow-1',
                        style: {
                            cursor: 'pointer'
                        },
                        on: {
                            click: function ( e ) {
                                _this.$emit( 'click:download', file );
                            }
                        }
                    }, [
                        this.$createElement( 'span', {}, [ file.name ] ),
                        this.$createElement( 'span', {
                            style: { fontSize: '12px' }
                        }, [ Math.round( file.size / 1024 )  + ' KB' ] )
                    ] );
                },

                genFile: function( file ) {
                    return this.$createElement( 'div', {
                        staticClass: 'input-group d-flex justify-content-between align-items-center'
                    }, [ this.genFileInfo( file ), this.genDeleteIcon( file ) ] );
                },

                genFileList: function( h ) {
                    var _this = this
                    var items = this.files.map( function( file ) {
                        var item = _this.genFile( file );
                        return h( 'li', {
                                staticClass: 'list-group-item list-group-item-action'
                            }, [ item ] );
                    } );

                    return h( 'ul', {
                        staticClass: 'list-group'
                    }, items );
                },

                genFileBrowserButton: function () {
                    var _this = this;
                    return this.$createElement( TsBtn, {
                        on: {
                            click: this.openFileBrowser
                        }
                    }, [ 'Browse', this.$createElement( 'input', {
                        style: {
                            display: 'none'
                        },
                        attrs: {
                            type: 'file',
                            multiple: this.multiple,
                            accept: this.accept
                        },
                        on: {
                            change: this.onFileChange
                        },
                        ref: 'file'
                    }, [] ) ] );
                },

                genRemoveButton: function () {
                    return this.$createElement( TsBtn, {
                        on: {
                            click: this.onRemoveButtonClick
                        }
                    }, [ 'delete' ] );
                },

                openFileBrowser: function () {
                    this.$refs.file.click();
                },

                onFileChange: function () {
                    var _this = this;
                    var uploaded = this.$refs.file.files;

                    uploaded.forEach( function( file, idx ) {
                        _this.files.push( file );
                    } );
                },

                onRemoveButtonClick: function () {
                    this.files
                },

                onSelectCheckedFiles: function () {
                    this.$emit( 'select-files', this.files.filter( function ( f ) {
                        return f.checked;
                    } ) );
                }
            },

            render: function( h ) {
                var children = [
                    h( 'div', null, [ this.genFileBrowserButton() ] ),
                    h( 'div', null, [ this.genFileList( h ) ] )
                ];
                return h( 'div', null, children );
            }
        };
});