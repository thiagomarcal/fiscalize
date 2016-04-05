myApp.controller('FiscalizaController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, convenios, $cordovaDevice)  {

	ADDRESS= 'http://74.124.24.115:8080'
	COLLECTION = 'Fiscalizados'


  	// Requisition Estados
	$scope.requisitionFiscalizados = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/'+COLLECTION+'?filter={uuid:"'+ $scope.uuid +'"},{situacao:1}').then(function(result) {
				$scope.fiscalizados = angular.fromJson(result._embedded["rh:doc"]);

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
	}

});
