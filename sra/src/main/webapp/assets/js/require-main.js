( function ( global, requirejs, driven ) {
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

var isProd = driven.mode === 'prod';
window.global = global === undefined ? {} : global;
window.realGrid2Lic = 'upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiNBG+1qQWvM8kSgE7/GtRGxZRBvK+uqtEzRc8m0g6PtACWMYR0ETY9Q1NqSTTJH1R8WINJ/M3+RpkxValpjT3ck=';
requirejs.onError = function ( err ) {
    if ( err.requireType === 'timeout' ) {
        alert( '인터넷 연결을 확인해주세요.' );
    } else {
        throw err;
    }
};
requirejs.config( {
    waitSeconds: 60,
    baseUrl: 'assets',
    paths: {
        /* === requirejs-plugins === */
        'text':                             'lib/requirejs/plugins/text/2.0.16/text.min',
        'css':                              'lib/requirejs/plugins/css/0.1.10/css.min',
        'json':                             'lib/requirejs/plugins/json/0.0.3/json.min',
        /* === library === */
        '@js-joda/core':                    'lib/js-joda/core/3.2.0/js-joda',
        '@realgrid':                        'lib/realgrid/2.3.4/realgrid.min',
        '@axios':                           'lib/axios/0.21.0/axios.min',
        'jquery':                           'lib/jquery/3.5.1/jquery.slim.min',
        'bootstrap':                        'lib/bootstrap/4.6.0/js/bootstrap.bundle',
        'summernote':                       'lib/summernote/0.8.18/summernote-bs4.min',
        'vue':                              'lib/vue/2.6.12/' + ( isProd ? 'vue.min' : 'vue' ),
        'vuex':                             'lib/vuex/3.6.0/vuex.min',
        'vue-notification':                 'lib/vue-notification/1.3.20/vue-notification',
        'vue-js-modal':                     'lib/vue-js-modal/2.0.0-rc.6/vue-js-modal.nocss',
        'vuejs-datepicker':                 'lib/vuejs-datepicker/1.6.2/vuejs-datepicker.min',
        'vuejs-datepicker/locale':          'lib/vuejs-datepicker/1.6.2/locale/translations/ko',
        'vue2-datepicker':                  'lib/vue2-datepicker/3.9.1/vue2-datepicker',
        'vue2-datepicker/locale':           'lib/vue2-datepicker/3.9.1/locale',
        'splitpanes':                       'lib/splitpanes/2.3.6/splitpanes.umd.min',
        /* === vue-plugins === */
        'vue-components-install':           'plugins/vue-components-install',
        'vue-dialog-install':               'plugins/vue-dialog-install',
        'vue-notification-install':         'plugins/vue-notification-install',
        'vue-js-modal-install':             'plugins/vue-js-modal-install',
        'vuex-store-install':               'plugins/vuex-store-install',
        /* === vue-utils === */
        'vuex-map-util':                    'plugins/util/vuex-map-util',
        'vue-async-component-factory':      'plugins/util/vue-async-component-factory',
        'vue-async-component-provider':     'plugins/util/vue-async-component-provider',
        /* === plugins-support === */
        'js-joda':                          'plugins/support/js-joda',
        'axios':                            'plugins/support/axios',
        'realgrid':                         'plugins/support/realgrid',
        'sce':                              'plugins/support/sce',
        /* === entry-point === */
        'login':                            'js/login',
        'main':                             'js/main',
        'modal':                            'pages/modal'
    },
    shim: {
        /* requirejs-plugins */
        'json':                             { deps: [ 'text' ] },
        /* === library === */
        'bootstrap':                        { deps: [ 'jquery' ] },
        'summernote':                       { deps: [ 'jquery' ] },
        'vuex':                             { deps: [ 'vue' ] },
        'vue-notification':                 { deps: [ 'vue' ] },
        'vue-js-modal':                     { deps: [ 'vue' ] },
        // 'realgrid2':                        { deps: [], exports: 'RealGrid' },
        /* === vue-mixins === */
        'mixins/session-mixin':             { deps: [ 'vuex-map-util' ] },
        'mixins/mdi-tabs-mixin':            { deps: [ 'vuex-map-util' ] },
        'mixins/mdi-tab-mixin':             { deps: [ 'vuex-map-util' ] },
        /* === vue-plugins === */
        'vue-notification-install':         { deps: [ 'vue', 'vue-notification' ] },
        'vue-js-modal-install':             { deps: [ 'vue', 'vue-js-modal' ] },
        'vue-components-install':           { deps: [ 'vue' ] },
        'vuex-store-install':               { deps: [ 'vue', 'vuex', 'vue-async-component-provider' ] },
        /* === vue-utils === */
        'vuex-map-util':                    { deps: [ 'vuex' ] },
        'vue-async-component-provider':     { deps: [ 'vue-async-component-factory' ] },
        /* === plugins-support === */
        'js-joda':                          { deps: [ '@js-joda/core' ] },
        'axios':                            { deps: [ '@axios' ] },
        'realgrid':                         { deps: [ '@realgrid' ] }
    }
} );
define( 'vue2-datepicker-with-locale', [
    'vue2-datepicker',
    'vue2-datepicker/locale/ko'
], function ( Datepicker ) {
    return Datepicker;
} );
requirejs( [ driven.entryPoint ] );
} )( window.global, window.requirejs, window.driven );
