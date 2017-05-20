angular.module('app')
.controller('createController', ['$scope', '$location', 'userFactory', 'surveyFactory', '$routeParams', function($scope, $location, userFactory, surveyFactory, $routeParams) {

	// Private
	function checkLogin(){
		if(Object.keys($scope.current_user).length == 0){
			alert("Sorry, you were logged out, please log back in")
			return $location.url('/');
		}
	}
	function resetSurvey(){
		$scope.survey = { 
			user: '',
			question: '',
			option1: {content: ''},
			option2: {content: ''},
			option3: {content: ''},
			option4: {content: ''},
		}
	}
	resetSurvey();
	
	// Public
	$scope.current_user = userFactory.getCurrentUser();
	$scope.errors = null;
	
	$scope.create = function(survey){
		survey.user = $scope.current_user
		if(checkLogin()){
			return
		};
		surveyFactory.create(survey)
		.then(
			function(res){
				$location.url('/poll/' + res.data.data._id)
			},
			function(err){
				$scope.errors = err.data.errors.errors
			}
		)
	}

	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');
	}
}]);