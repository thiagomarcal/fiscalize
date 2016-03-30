var myApp = angular.module('myApp', ['ui.router', 'mobile-angular-ui']);

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
         .state('denuncia', {
            url:'/denuncia/:convenioId',
            templateUrl: 'components/denuncia/denuncia.html',
            controller: 'DenunciaController'
        });

}]);