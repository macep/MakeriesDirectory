(function () {
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
