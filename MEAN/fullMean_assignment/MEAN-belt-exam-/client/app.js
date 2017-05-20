var myApp = angular.module('Myapp', ['ngRoute']);

(function(){
	myApp.config(function($routeProvider){
		$routeProvider
		.when('/login',
		{
			controller: 'loginController',
			templateUrl: "partials/login.html"
		})
		.when('/logout',
		{
			controller: 'logoutController',
			templateUrl: "partials/login.html"
		})
		.when('/',
		{
			controller: 'questionsController',
			templateUrl: "partials/questions/index.html"
		})
		.when('/questions/new',
		{
			controller: 'questionsController',
			templateUrl: 'partials/questions/new.html'
		})
		.when('/questions/:id',
		{
			controller: 'questionController',
			templateUrl: 'partials/questions/show.html'
		})
		.when('/questions/:id/answers/new',
		{
			controller: 'answersController',
			templateUrl: 'partials/answers/new.html'
		})
	})
}());
