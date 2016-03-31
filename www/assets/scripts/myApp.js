// var myApp = angular.module('myApp', ['ui.router', 'mobile-angular-ui']);
var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui']);

myApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
	    templateUrl: 'components/home/home.html',
	    controller: 'HomeController'
	    })
    .when('/denuncia/:convenioId', {
        templateUrl: 'components/denuncia/denuncia.html',
        controller: 'DenunciaController'
        })
    .when('/detalhe/:convenioId', {
        templateUrl: 'components/detalhe/detalhe.html',
        controller: 'DetalheController'
        });
});


myApp.factory('convenios', function () {
    var convenios = [];
    return convenios;
});


// myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//  	$urlRouterProvider.otherwise('/');
//     $stateProvider
//         .state('home', {
//             url:'/',
//             templateUrl: 'components/home/home.html',
//             controller: 'HomeController'
//         })
//          .state('denuncia', {
//             url:'/denuncia/:convenioId',
//             templateUrl: 'components/denuncia/denuncia.html',
//             controller: 'DenunciaController'
//         });

// }]);