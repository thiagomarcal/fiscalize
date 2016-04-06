myApp.controller('HomeController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, convenios)  {

	// Page Initial Value
	page = 1;

	// Const Values
	PAGESIZE = 10;
	ADDRESS= 'http://74.124.24.115:8080'
	COLLECTION = 'ConveniosProgramasFTS'

	// Requisition Home 
	$scope.home = function() {
		if (angular.isUndefined($scope.convenios)) {
			$scope.convenios = [];
			$scope.url = '/hackathon/'+COLLECTION+'?count&page='+ page +'&pagesize='+ PAGESIZE +'&hal=f';
			$scope.requisition();
		};
	}

	// Requisition Search 
	$scope.search = function() {
		if (angular.isUndefined($scope.searchParam) || $scope.searchParam == null) {
			$scope.home();
		}
		else {
			$scope.convenios = [];
			estado = angular.isUndefined($scope.estadoSelecionado)?"":$scope.estadoSelecionado.UF_PROPONENTE; 
			ministerio = angular.isUndefined($scope.ministerioSelecionado)?"":$scope.ministerioSelecionado.NM_ORGAO_SUPERIOR; 
			$scope.url = '/hackathon/'+COLLECTION+'?count&page='+page+'&pagesize='+PAGESIZE+'&filter={UF_PROPONENTE:{$regex:"'+ estado +'"},NM_ORGAO_SUPERIOR:{$regex:"'+ ministerio +'"},$text:{$search:"'+$scope.searchParam+'"}}&sort_by=DT_INICIO_VIGENCIA&hal=f';
			$scope.requisition();
		};

	}

	// Requisition Scroll 
	$scope.loadMore = function () {
		$scope.requisition();
	};

	$scope.flagSearch = function() {
		$scope.advSearch = !$scope.advSearch;
	}

	// Requisition Convenios
	$scope.requisition = function() {

			convenios_temp = [];

				if (angular.isDefined($scope.url) || $scope.url != null) {

					requisicaoFactory.getRequest(ADDRESS + $scope.url).then(function(result) {

					if (result._size > 0) {
						convenios_temp = angular.fromJson(result._embedded["rh:doc"]);

				    	angular.forEach(convenios_temp, function(value, key) {
				    		$scope.convenios.push(value);
						});	

					};	

					$scope.url = angular.isDefined(result._links.next.href)?result._links.next.href: null;

					}, function(reason) {
					     alert("Erro ver console!")
					    console.log("reason:", reason);
					    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
					}, function(update) {
					    console.log("update:", update);
					})
				}
	}

	// Requisition Estados
	$scope.requisitionEstados = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/Estados?sort_by=UF_PROPONENTE').then(function(result) {
				$scope.estados = angular.fromJson(result._embedded["rh:doc"]);

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
	}


	// Requisition Convenios
	$scope.requisitionMinisterios = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/Ministerios?sort_by=NM_ORGAO_SUPERIOR').then(function(result) {
				$scope.ministerios = angular.fromJson(result._embedded["rh:doc"]);

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
	$scope.requisitionEstados();
	$scope.requisitionMinisterios();

});