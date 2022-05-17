define( ( function ( modules ) {
    var components = [
        'TsOverlay',
        'TsLayout',
        'TsContent',
        'TsContentModal',
        'TsTabs',
        'TsTab',
        'TsTabsItems',
        'TsTabItem',
        'TsBox',
        'TsTitle',
        'TsForm',
        'TsFieldset',
        'TsMenuList',
        'TsNotify',
        'TsMdi',
        'TsBadge',
        'TsBtn',
        'TsText',
        'TsCodeText',
        'TsTextarea',
        'TsCheckbox',
        'TsRadioGroup',
        'TsRadio',
        'TsSelect',
        'TsDatepicker',
        'TsPagination',
        'TsAlert',
        'TsEditor',
        'TsGrid',
        'TsFileList',
        'TsFileUpload'
    ];
    modules.push.apply( modules, components.map( function ( name ) {
        return [ 'components', name, name ].join( '/' );
    } ) );
    return modules;
} )( [
    'vue',
    'splitpanes',
    'components/document/DocSection',
    'components/document/DocSentence',
    'components/document/DocPhrase'
] ), function ( Vue, SplitModule  ) {
    var components = Array.prototype.slice.call( arguments, 2 );
    var Module = {
        install: function ( Vue ) {
            components.forEach( function ( c ) { Vue.component( c.name, c ); } );
            Vue.component( 'Splitpanes', {
                mixins: [ SplitModule.Splitpanes ],
                props: {
                    dblClickSplitter: { type: Boolean, default: false }
                },
                created: function () {
                    var event;
                    if ( typeof window.Event === 'function' ) {
                        event = new window.Event( 'resize' );
                    } else {
                        event = window.document.createEvent( 'UIEvents' );
                        event.initUIEvent( 'resize', true, false, window, 0 );
                    }
                    var dispatch = window.dispatchEvent.bind( window );
                    this.$on( 'resize', function ( e ) {
                        dispatch( event );
                    } );

                    this.$on( 'resized', function ( e ) {
                        dispatch( event );
                    } );
                }
            } );
            Vue.component( 'Pane', {
                mixins: [ SplitModule.Pane ],
                props: {
                    minSize: { default: '10' }
                }
            } );

            Vue.directive( 'tooltip', {
                inserted: function ( el, binding ) {
                    var elem = window.jQuery ? window.jQuery(el) : null;
                    // need botstrap
                    if (elem && elem.tooltip) {
                        if (typeof binding.arg === 'string') {
                            elem.attr('data-placement', binding.arg);
                        }
                        elem.attr('data-original-title', binding.value);
                        elem.tooltip();
                    }
                },
                unbind: function (el) {
                    var elem = window.jQuery ? window.jQuery(el) : null;
                    elem && elem.tooltip && elem.tooltip('dispose');
                }
            } );
        }
    };
    Vue.use( Module );
} );