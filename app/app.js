/**
 * Created by cristi on 26/06/2017.
 */

(function () {
    'use strict';

    var jgm = angular.module('jgm', [
        'ui.router',
        'ui.bootstrap',
        'pascalprecht.translate'
    ]);


    // set the configuration
    jgm.run(['$rootScope', function ($rootScope) {
        // fetched from wp_localize_script() and stored in the Angular rootScope
        $rootScope.dir = blogInfo.url;
        $rootScope.site = blogInfo.site;
        $rootScope.api = appAPI.url;
    }]);


    // add a controller
    jgm.controller('testcontroller', ['$scope', '$http', function ($scope, $http) {
        // load posts from the WordPress API, demo
        $http({
            method: 'GET',
            url: $scope.api + 'posts'
        }).then(
            function (data, status, headers, config) {
                $scope.postdata = data.data;
                console.log(data);
            }, function (data, status, headers, config) {}
        );
    }]);


    jgm.controller('AlertDemoCtrl', function ($scope) {
        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];

        $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    });
})();
