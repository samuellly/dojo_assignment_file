var app = angular.module('pollSurvey', ['ngRoute','ngCookies'])
app.config(function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeController'
        })

        .when('/wall',{
        	templateUrl: 'partials/wall.html',
        	controller: 'wallController'
        })

        .when('/newPoll',{
        	templateUrl: 'partials/poll.html',
        	controller: 'pollController'
        })

      .when('/vote/:id',{
      	templateUrl: 'partials/pollvotes.html',
        controller: 'voteController'
      })

     
        .otherwise({
            redirectTo:'/home'
        })
})