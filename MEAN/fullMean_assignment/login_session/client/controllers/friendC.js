myApp.controller('friendController', ['$scope','friendsFactory', '$location', function($scope, friendsFactory, $location) {
/*
  THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
  WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
*/
var index = function(){
                        friendsFactory.index(function(returnedData){
                          $scope.friends = returnedData;
                        });
            };
index();

$scope.create = function(){
		friendsFactory.create($scope.newFriend, function(newFriend){
			$scope.newFriend = newFriend;
		})
		$scope.newFriend = {};
		$location.url('/')
		console.log($scope.friends)
	}

$scope.delete = function(id){
	console.log(id)
	friendsFactory.delete(id, function(deleteFriend){
		console.log(deleteFriend)
		index();
	})
}


}]);
