angular.module('app')
.controller('loginController', ['$scope', '$location', 'userFactory', function($scope, $location, userFactory) {

	$scope.error = null;

	// $scope.register = function(newuser){
	// 	console.log(newuser)
	// 	userFactory.register(newuser)
	// 	.then(function(res){
	// 		$scope.regErrors = null;
	// 		$scope.loginErrors = null;
	// 		$location.url('/dashboard');
	// 	})
	// 	.catch(function(res){
	// 		$scope.regErrors = res.data.errors.errors;
	// 		$scope.loginErrors = null;
	// 	})	
	// };

	$scope.login = function(user){
		userFactory.login(user)
		.then(function(){
			$location.url('/dashboard');
		})
		.catch(function(res){
			$scope.error = res.data.errors.login_reg.message;
			$scope.regErrors = null;
		})
	};


}]);