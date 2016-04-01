myApp.controller('DetalheController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, convenios)  {

	//Parametros
	$scope.params = $routeParams;

	ADDRESS= 'http://74.124.24.115:8080'

	// Requisition Estados
	$scope.requisitionDetail = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/ConveniosProgramasFTS?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.convenio = angular.fromJson(result._embedded["rh:doc"])[0];

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
	}

	$scope.requisitionDetail();

	$scope.checkDate = function (date) {
		return (new Date() < new Date(date));
	}

});
