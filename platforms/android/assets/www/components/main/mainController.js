myApp.controller('MainController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache, Fiscalizados)  {

	ADDRESS= 'http://74.124.24.115:8080'

  	// Requisition Fiscalizados
	$scope.requisitionFiscalizados = function() {

			requisicaoFactory.getRequest(ADDRESS+'/hackathon/Fiscalizados?filter={uuid:"'+ myCache.get('uuid') +'"},{situacao:1}&hal=f').then(function(result) {
			Fiscalizados.setLista(angular.fromJson(result._embedded["rh:doc"]));
			$scope.fiscalizados = Fiscalizados.getLista();

			angular.forEach(Fiscalizados.getLista(), function(value, key) {
				// Fiscalizados Recentes
				if (new Date(value.dt_updated) < new Date(value._lastupdated_on)) {
					value.recente = 1;
				}
			});	

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})			  
	}

	// Requisition Update Fiscalizado
	$scope.atualizaFiscalizado = function(fiscalizado) {

			requisicaoFactory.putRequest(ADDRESS+'/hackathon/Fiscalizados', fiscalizado).then(function(result) {
				
				alert('UUID: '+ $scope.fiscalizado.uuid +' Convenio: ' +  fiscalizado.convenio.NR_CONVENIO + 'Atualizado!');

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

	$scope.atualizaData = function(fiscalizado) {
		fiscalizado.dt_updated = new Date();
		$scope.atualizaFiscalizado(fiscalizado);
		$location.path('/detalhe/'+fiscalizado.convenio.NR_CONVENIO);
	}

});
