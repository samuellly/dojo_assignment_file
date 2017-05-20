app.controller('loginController', function($scope, loginFactory, $location) {
    $scope.registerUser = function() {
        loginFactory.register($scope.user, function(data) {
            if (data.data.errors) {
                $scope.reg_errors = data.data.errors;
            } else {
                $scope.loggedIn = data;
                $location.url('/success');
            }
        });
    };

    $scope.loginUser = function() {
        loginFactory.login($scope.user, function(data) {
            if (data.data.errors) {
                $scope.login_errors = data.data.errors;
            }
            else {
                console.log(data);
                $scope.loggedIn = data.data._id;
                console.log($scope.loggedIn);
                $location.url('/success');
            }
        });
    };
});
