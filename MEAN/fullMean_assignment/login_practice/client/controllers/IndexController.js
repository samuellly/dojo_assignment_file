(function() {
    'use strict';

    angular.module('app')
        .controller('IndexController', IndexController);

    function IndexController($scope, $location, UserFactory) {
        $scope.user = {};
        $scope.loggedIn = true;

        UserFactory.getUser(function(user) {
            $scope.user = user;
            $scope.loggedIn = user.firstName ? true : false
        });
    }

})();
