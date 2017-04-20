var app = angular.module("App", ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/View/User.html',
        controller: 'UserController'
    }).when('/View/Pet/:UserId', {
        templateUrl: '/View/Pet.html',
        controller:'PetController'
    }).otherwise({
        retidectTo:"/"
    });
});
