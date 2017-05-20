var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'mainController'
    })
    .when('/new', {
        templateUrl: 'partials/new.html',
        controller: 'mainController'
    })
    .when('/edit/:id', {
        templateUrl: 'partials/edit.html',
        controller: 'editController'
    })
    .when('/show/:id', {
        templateUrl: 'partials/show.html',
        controller: 'editController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.filter('birthdayFilter', function() {
    return function(items, filterdate) {
        if (!filterdate) {
            return items;
        }
        var newdate = new Date(filterdate);
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var itemdate = new Date(items[i].birthday);
            if (itemdate.toString() == newdate.toString()) {
                filtered.push(items[i]);
            }
        }
        return filtered;
    };
});

app.filter('capitalize', function() {
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
});
