(function () {
    'use strict';

    var jgm = angular.module('jgm', []);

    jgm.factory("authService", ["",
        function () {

            var AuthService = function () {};

            return new AuthService();
        }]);
})();
