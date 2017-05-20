angular.module('app')
.controller('dashboardController', ['$scope', '$location', 'userFactory', 'surveyFactory', function($scope, $location, userFactory, surveyFactory) {

	$scope.current_user = userFactory.getCurrentUser();
	$scope.surveys = [];

	function index(){
		surveyFactory.index()
		.then(function(res){
			$scope.surveys = res.data.data;
		})
	}
	index();

	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');	
	}

	$scope.delete = function(id){
		surveyFactory.delete(id)
		.then(function(res){
			index();
		})
	}
}]);