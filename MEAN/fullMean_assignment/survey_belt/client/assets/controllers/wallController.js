app.controller('wallController', ['$scope', '$location', 'userFactory', '$cookies', function($scope, $location, userFactory, $cookies) {
    $scope.user = {};
    $scope.polls = [];


    if ($cookies.getObject('newUser')) {
        $scope.newUser = $cookies.getObject('newUser')
    } else {
        $location.url('/')
    }


    $scope.getpolls = function() {
        userFactory.getpolls(function(data) {
            $scope.polls = data
        })
    }
    $scope.getpolls();

    $scope.deletepoll = function(id) {
        userFactory.deletepoll(id, function() {
            $scope.getpolls()
        })
    }

$scope.logout = function() {
    $cookies.remove('newUser')
    $location.url('/')
}




}])
