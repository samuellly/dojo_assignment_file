app.controller('mainController', function($scope, $routeParams, friendFactory, $location) {
    $scope.friends =[];
    $scope.friend = {};
    function getFriends(data) {
        $scope.friends = data;
        $scope.friend = {};
    }

    friendFactory.index(getFriends);

    $scope.addFriend = function() {
        if ('first_name' in $scope.friend && 'last_name' in $scope.friend && 'birthday' in $scope.friend) {
            console.log($scope.friend);
            friendFactory.create($scope.friend, function(data) {
                friendFactory.index(getFriends);
                $location.url('/show/' + data._id);
            });
        }
    };

    $scope.getFriend = function(id) {
        friendFactory.show(id, function(data) {
            $scope.friend = data;
        });
    };

    $scope.removeFriend = function(id) {
        friendFactory.delete(id);
        friendFactory.index(getFriends);
    };
});
