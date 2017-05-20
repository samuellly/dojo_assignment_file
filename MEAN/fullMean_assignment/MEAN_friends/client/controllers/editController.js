app.controller('editController', function($scope, friendFactory, $routeParams, $location) {
    $scope.id = $routeParams.id;
    $scope.friend = {};
    function getFriend(id) {
        friendFactory.show(id, function(data) {
            $scope.friend.first_name = data.first_name;
            $scope.friend.last_name = data.last_name;
            $scope.friend.birthday = new Date(data.birthday);
            $scope.first_name = $scope.friend.first_name;
            $scope.last_name = $scope.friend.last_name;
        });
    }

    $scope.updateFriend = function() {
        console.log($scope.friend);
        if ($scope.friend.first_name && $scope.friend.last_name && $scope.friend.birthday) {
            console.log('passed validation');
            friendFactory.update($scope.id, $scope.friend);
            $location.url('/');
        }
    };

    getFriend($scope.id);

});
