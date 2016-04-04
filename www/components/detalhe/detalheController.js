myApp.controller('DetalheController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, convenios)  {

	//Parametros
	$scope.params = $routeParams;

	ADDRESS= 'http://74.124.24.115:8080'

	// Requisition
	$scope.requisitionDetail = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/ConveniosProgramasFTS?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.convenio = angular.fromJson(result._embedded["rh:doc"])[0];

				$scope.valorPlano = parseFloat($scope.convenio.VL_GLOBAL.replace(/[^0-9\.]+/g,""));
				$scope.valorDesembolso = parseFloat($scope.convenio.VL_DESEMBOLSADO.replace(/[^0-9\,]+/g,""));

				$scope.remaining = ((100*$scope.valorDesembolso)/$scope.valorPlano);

				$scope.totalCronogramaFisico = 0;
				angular.forEach($scope.convenio.CronogramaFisicoPTs, function(value, key) {
					if (angular.isDefined(value.VL_META) || value.VL_META != null) {
				    	$scope.totalCronogramaFisico += parseFloat(value.VL_META.replace(/[^0-9\,]+/g,""));
					};
				});	

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}


	// Requisition
	$scope.requisitionPlano = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/PlanoAplicacaoPT?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.planoAplicacao = angular.fromJson(result._embedded["rh:doc"]);

				$scope.totalPlano = 0;
				angular.forEach($scope.planoAplicacao, function(value, key) {
					if (angular.isDefined(value.VL_TOTAL) || value.VL_TOTAL != null) {
				    	$scope.totalPlano += parseFloat(value.VL_TOTAL.replace(/[^0-9\,]+/g,""));
					};
				});	

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}



	$scope.requisitionDetail();

	$scope.checkDate = function (date) {
		return (new Date() < new Date(date));
	}

});
