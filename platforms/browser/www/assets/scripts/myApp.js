var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
	    templateUrl: 'components/home/home.html',
	    controller: 'HomeController'
	    })
});
