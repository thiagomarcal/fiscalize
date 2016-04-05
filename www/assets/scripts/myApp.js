var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'angular-svg-round-progressbar', 'chart.js','tc.chartjs','ngCordova']);

myApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
	    templateUrl: 'components/splash/splash.html',
	    controller: 'SplashController'
	    })
    .when('/home', {
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



// Set up the cache ‘myCache’
myApp.factory('myCache', function($cacheFactory) {
    return $cacheFactory('myData');
});
