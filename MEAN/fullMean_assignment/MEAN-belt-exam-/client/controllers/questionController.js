myApp.controller('questionController', function($scope, $location, $routeParams, questionFactory, answerFactory, userFactory){
	$scope.question = {};
	$scope.user = userFactory.user;

	if ($scope.user) {
		console.log("Name is ", $scope.user)
	} else {
		$location.url('/login');
	}

	questionFactory.show($routeParams.id, function callback (data) {
		$scope.question = data;
	})

	$scope.likeAnswer = function(answer) {
		answerFactory.like(answer._id, function callback (data) {
			answer.likes = data.data;
			console.log("liked")
		})
	}
})
