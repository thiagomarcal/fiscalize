var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
	.when('/home', {
	    templateUrl: 'components/home/home.html',
	    controller: 'HomeController'
	    })
});
