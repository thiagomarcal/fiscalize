myApp.controller('HomeController', function($scope, $http, $location, $routeParams, requisicaoFactory)  {
	
	requisicaoFactory.getRequest('http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page=1&pagesize=10').then(function(valorRetornado) {
	    $scope.convenios =  angular.fromJson(valorRetornado._embedded["rh:doc"]);
	}, function(reason) {
	     alert("Erro ver console!")
	    console.log("reason:", reason);
	    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
	}, function(update) {
	    console.log("update:", update);
	})


	$scope.search = function(input) {
			
			requisicaoFactory.getRequest("http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page=1&pagesize=10&filter={$text:{$search:'"+input+"'}}&sort_by=DT_INICIO_VIGENCIA").then(function(valorRetornado) {
				$scope.convenios =  angular.fromJson(valorRetornado._embedded["rh:doc"]);
			}, function(reason) {
				console.log("reason:", reason);
			//	util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
				console.log("update:", update);
			});
			
		}


});
