angular.module('app', ['ngRoute', 'angular-momentjs'])
.config(function($momentProvider){
	$momentProvider
	.asyncLoading(false)
	.scriptUrl('moment/min/moment.min.js');
})
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html',
		controller: 'loginController',
		controllerAs: 'loginCtrl',
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboardController',
		controllerAs: 'dashboardCtrl'
	})
	.when('/poll/:id', {
		templateUrl: 'partials/show.html',
		controller: 'showController',
		controllerAs: 'showCtrl'
	})
	.when('/create', {
		templateUrl: 'partials/create.html',
		controller: 'createController',
		controllerAs: 'createCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});