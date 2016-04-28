myApp.controller('MinhasManifestacoesController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, myCache)  {

	//Parametros
	$scope.params = $routeParams;

	// Initial Values
	page = 1;

	// Const Values
	PAGESIZE = 10;
	ADDRESS= 'http://74.124.24.115:8080'
	COLLECTION = 'Denuncias'


	$scope.carregarMinhasManifestacoes = function() {

		var filter = '?filter={uuid:"' + myCache.get('uuid') + '"}';
		requisicaoFactory.getRequest(ADDRESS+'/hackathon/'+ COLLECTION + filter).then(function(result) {
			$scope.manifestacoes = angular.fromJson(result._embedded["rh:doc"]);
			console.log(angular.fromJson(result._embedded["rh:doc"]));
		}, function(reason) {
		    alert("Erro ver console!")
		    console.log("reason:", reason);
		    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
		}, function(update) {
		    console.log("update:", update);
		})
	}

	$scope.carregarMinhasManifestacoes();
});
