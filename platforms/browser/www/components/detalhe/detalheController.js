myApp.controller('DetalheController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, convenios)  {

	//Parametros
	$scope.params = $routeParams;

	$scope.convenio = parseInt($scope.params.convenioId);

	

});
