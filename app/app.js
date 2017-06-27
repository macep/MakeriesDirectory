(function () {
    'use strict';

    var jgm = angular.module('jgm', [
        'ui.router',
        'ui.bootstrap',
        'pascalprecht.translate'
    ]);
})();

;(function () {
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

;/**
 * Created by cristi on 27/06/2017.
 */

(function () {
    'use strict';

    var jgm = angular.module('jgm');

    jgm.factory("ApiService", ["",
        function () {

            var ApiService = function () {};

            return new ApiService();
        }]);
})();

;/**
 * Created by cristi on 27/06/2017.
 */

(function () {
    'use strict';

    var jgm = angular.module('jgm');

    jgm.factory("authService", ["",
        function () {

            var AuthService = function () {};

            return new AuthService();
        }]);
})();

;(function () {
    'use strict';

    var jgm = angular.module('jgm');

    // add a controller
    jgm.controller('HomeController', ['$scope', '$http', function ($scope, $http) {
        // load posts from the WordPress API, demo
        $http({
            method: 'GET',
            url: $scope.api + 'posts'
        }).then(
            function (data, status, headers, config) {
                $scope.postdata = data.data;
                console.log(data.data);
            }, function (data, status, headers, config) {}
        );
    }]);
})();
