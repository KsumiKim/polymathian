define( [
    'mixins/validatable-mixin',
    'mixins/proxyable-mixin-factory',
    'jquery',
    'summernote',
], function ( validatableMixin, proxyableMixinFactory, $ ) {
    return {
        name: 'ts-editor',
        mixins: [ validatableMixin, proxyableMixinFactory() ],
        data: function () {
            return {
                internalLazyEditor: null
            }
        },
        computed: {
            classes: function () {
                return {
                    'ts-editor': true
                };
            }
        },
        mounted: function () {
            var internalLazyEditor = $( this.$refs.editor ).summernote( {
                disableResizeEditor: true,
                callbacks: {
                    onBlur: this.onBlur.bind( this )
                }
            } );
            var editor = internalLazyEditor.find( '+ .note-editor' );
            editor.addClass( 'd-flex flex-column' ).children().each( function ( _, elem ) {
                var growClass = elem.classList.contains( 'note-editing-area' ) ? 'flex-grow-1' : 'flex-grow-0';
                elem.classList.add( growClass );
            } );
            this.internalLazyEditor = internalLazyEditor;
        },
        methods: {
            onBlur: function ( e ) {
                this.internalValue = e.target.innerHTML;
            },
            genEditor: function () {
                return this.$createElement( 'textarea', {
                    staticClass: 'ts-editor-input',
                    ref: 'editor'
                }, [] );
            },
            /** @deprecated */
            calculateOtherHeight: function () {
                var clientHeight = this.$el.clientHeight;
                var otherHeight = this.internalLazyEditor.find( '+ .note-editor' ).find('> .note-toolbar, > .note-statusbar' ).height();
                return clientHeight - otherHeight;
            }
        },
        render: function ( h ) {
            return h( 'div', {
                class: this.classes,
            }, [ this.genEditor() ] );
        }
    };
} );