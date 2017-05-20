myApp.controller('questionsController', function($scope, $location, questionFactory, userFactory){
	$scope.questions = [];
	$scope.newQuestion = {};
	$scope.user = userFactory.user;

	if ($scope.user) {
		console.log("Name is ", $scope.user)
	} else {
		$location.url('/login');
	}

	questionFactory.index(function callback (data) {
		$scope.questions = data;
	})

	$scope.createQuestion = function() {
		$scope.newQuestion.author = $scope.user
		questionFactory.create($scope.newQuestion, function callback (data) {
			console.log(data);
			if (data.errors) {
				$scope.errors = data.errors
			} else {
				$location.url('/');
			}
		})
	}
	$scope.cancelQuestion = function() {
		$location.url('/');
	}
})
