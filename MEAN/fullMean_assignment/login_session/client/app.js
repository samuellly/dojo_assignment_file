var myApp = angular.module('myApp', ['ngRoute'])

.config(function($routeProvider){
	$routeProvider
	.when('/new', {
		templateUrl : 'partials/new.html'
	})
	.when('/edit', {
		templateUrl : 'partials/edit.html'
	})
	.when('/show', {
		templateUrl : 'partials/show.html'
	})
	.when('/', {
		templateUrl : 'partials/dash.html'
	})
	.otherwise({
		redirectTo : '/'
	})
})
