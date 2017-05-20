angular.module('app')
.controller('showController', ['$scope', '$location', 'surveyFactory', 'userFactory', '$routeParams', '$q', function($scope, $location, surveyFactory, userFactory, $routeParams, $q) {

	$scope.current_user = userFactory.getCurrentUser();

	var getSurvey = ()=>{
		surveyFactory.getSurvey($routeParams)
		.then(
			res=>{
				$scope.survey = res
			}
		)
	};
	getSurvey();


	$scope.vote = option=>{
		let answer = {}
		answer.id = "option" + String(option)
		surveyFactory.vote(answer, $routeParams)
		.then(
			res=>{
				$scope.survey = res.data.data
			}
		)
	}

	$scope.logout = ()=>{
		userFactory.logout()
		$location.url('/');
	}

}]);