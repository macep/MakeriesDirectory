(function () {
    'use strict';

    var themeUrl = 'wp-content/themes/justgotmade/';

    var jgm = angular.module('jgm');

    jgm
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$translateProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {

                $httpProvider.defaults.withCredentials = false;
                $urlRouterProvider.otherwise("/");

                $translateProvider.useStaticFilesLoader({
                    prefix: themeUrl + '/assets/translations/locale-',
                    suffix: '.json'
                });

                $translateProvider.preferredLanguage('en_US');
            }])

        .run(['$rootScope', '$state', '$stateParams', 'authService', 'ApiService', '$translate',
            function ($rootScope, $state, $stateParams, authService, apiService, $translate) {
                // fetched from wp_localize_script() and stored in the Angular rootScope
                $rootScope.dir = blogInfo.url;
                $rootScope.site = blogInfo.site;
                $rootScope.api = appAPI.url;
            }]);
})();
