myApp.controller('answersController', function($scope, $routeParams, $location, questionFactory, answerFactory, userFactory){
	$scope.question = {};
	$scope.newAnswer = {};
	$scope.user = userFactory.user;
	$scope.questionId = $routeParams.id

	if ($scope.user) {
		console.log("Name is ", $scope.user)
	} else {
		$location.url('/login');
	}

	questionFactory.show($routeParams.id, function callback (data) {
		$scope.question = data;
	})

	$scope.createAnswer = function() {
		$scope.newAnswer._questionId = $scope.question._id
		$scope.newAnswer.author = $scope.user
		answerFactory.create($routeParams.id, $scope.newAnswer, function callback (data) {
			console.log(data);
			if (data.errors) {
				$scope.errors = data.errors
			} else {
				$location.url('/');
			}
		})
	}

	$scope.cancelAnswer = function() {
		$location.url('/');
	}
})
