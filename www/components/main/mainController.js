myApp.controller('MainController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache, Fiscalizados)  {

	ADDRESS= 'http://74.124.24.115:8080'

  	// Requisition Estados
	$scope.requisitionFiscalizados = function() {

			requisicaoFactory.getRequest(ADDRESS+'/hackathon/Fiscalizados?filter={uuid:"'+ myCache.get('uuid') +'"},{situacao:1}').then(function(result) {
			Fiscalizados.setLista(angular.fromJson(result._embedded["rh:doc"]));
			$scope.fiscalizados = Fiscalizados.getLista();

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})			  
	}

	$scope.requisitionFiscalizados();

	$scope.refreshFiscalizados = function() {
		$scope.requisitionFiscalizados();
	}

});
