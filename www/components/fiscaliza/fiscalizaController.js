myApp.controller('FiscalizaController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache)  {

	ADDRESS= 'http://74.124.24.115:8080'

  	// Requisition Estados
	$scope.requisitionFiscalizados = function() {

			$scope.uuid = myCache.get('uuid');

			requisicaoFactory.getRequest(ADDRESS+'/hackathon/Fiscalizados?filter={uuid:"'+ $scope.uuid +'"},{situacao:1}').then(function(result) {
			$scope.fiscalizados = angular.fromJson(result._embedded["rh:doc"]);

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})	

	}

	$scope.requisitionFiscalizados();

});
