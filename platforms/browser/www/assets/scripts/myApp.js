var myApp = angular.module('myApp', ['ui.router','ngTouch','slickCarousel']);

// myApp.config(function($routeProvider) {
//     $routeProvider
// 	.when('/', {
// 	    templateUrl: 'components/home/home.html',
// 	    controller: 'HomeController'
// 	    })
// });



myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
 	$urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url:'/',
            templateUrl: 'components/home/home.html',
            controller: 'HomeController'
        })
}]);