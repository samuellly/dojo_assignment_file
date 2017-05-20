var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
    .when('/success', {
        templateUrl: 'partials/success.html',
        controller: 'loginController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
