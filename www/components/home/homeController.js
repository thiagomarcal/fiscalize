myApp.controller('HomeController', function($scope, $timeout , $http, $location, $stateParams, requisicaoFactory)  {

	// Page Initial Value
	page = 1;

	// Page Size Const Value
	PAGESIZE = 10;

	
	// //Requisition Home 
	$scope.home = function() {
		$scope.convenios = [];
		$scope.url = 'http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page='+ page +'&pagesize='+ PAGESIZE +'';
		$scope.requisition();
	}

	// //Requisition Search 
	$scope.search = function() {
		$scope.convenios = [];
		$scope.url = 'http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page='+page+'&pagesize='+PAGESIZE+'&filter={$text:{$search:"'+$scope.searchParam+'"}}&sort_by=DT_INICIO_VIGENCIA';
		$scope.requisition();
	}

	// Requisition Scroll 
	$scope.loadMore = function () {
		$scope.requisition();
	};

	//Requisition Convenios
	$scope.requisition = function() {

				requisicaoFactory.getRequest($scope.url).then(function(result) {
				convenios_temp = angular.fromJson(result._embedded["rh:doc"]);

			    angular.forEach(convenios_temp, function(value, key) {
			    	$scope.convenios.push(value);
				});

				page++;

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
	}

	// Initial Call Home
	$scope.home();

});
