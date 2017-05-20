angular.module('app', ['ngRoute', 'angular-momentjs'])
.config(function($momentProvider){
	$momentProvider
	.asyncLoading(false)
	.scriptUrl('moment/min/moment.min.js');
})
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/navbar.component.html',
	})
