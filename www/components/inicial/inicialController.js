myApp.controller('InicialController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, myCache, $cordovaCamera, $cordovaSplashscreen, GoogleMaps,Municipios)  {

	Municipios.getLista(GoogleMaps.getEstadoGoogleMaps()).then(function(result) {
		var municipios = angular.fromJson(result.data._embedded["rh:doc"]);
        Municipios.set(municipios); 
    });
    

   //Hide Splash Screen Cordova
   $cordovaSplashscreen.hide();

});
