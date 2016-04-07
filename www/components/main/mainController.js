myApp.controller('MainController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache, Fiscalizados, Convenios)  {

	// Requisition Fiscalizado
	$scope.requisitionFiscalizados = function() {
		Fiscalizados.getLista().then(function (result){
			$scope.fiscalizados = angular.fromJson(result.data._embedded["rh:doc"]);
			$scope.requisitionConvenio();
		});   
	}

	// Requisition Convenio
	$scope.requisitionConvenio = function() {

			temp = ""
			i = 0;
			angular.forEach($scope.fiscalizados, function(value, key) {
				temp += value.convenio.NR_CONVENIO;
				temp += ($scope.fiscalizados.length - 1) == i?'':',';
				i++;
			});	

			filtro = "?filter={NR_CONVENIO: {$in:["+temp+"]}}";

			Convenios.getListaFilter(filtro).then(function (result){
				
				$scope.conveniosFiscalizados = angular.fromJson(result.data._embedded["rh:doc"]);
				$scope.mapaConveniosFiscalizados = {};

				angular.forEach($scope.conveniosFiscalizados, function(value, key) {
					numeroConvenio = value.NR_CONVENIO;
					$scope.mapaConveniosFiscalizados[numeroConvenio] = value;
				});

				$scope.verificaRecentes();

			});
						  
	}

	// Compara Datas Para ver Recentes
	$scope.verificaRecentes = function() {
		angular.forEach($scope.fiscalizados, function(value, key) {

				if (angular.isDefined($scope.mapaConveniosFiscalizados)) {
					
					// Fiscalizados Recentes
					$scope.qtdRecentes = 0;
					if (new Date(value.dt_updated) < new Date($scope.mapaConveniosFiscalizados[value.convenio.NR_CONVENIO].lastUpdateDate.$date)) {
						value.recente = 1;
						$scope.qtdRecentes++;
					}
				}
			});	
	}

	// Requisition Update Fiscalizado
	$scope.atualizaFiscalizado = function(fiscalizado) {
			$scope.data = {};
			$scope.data.dt_updated = fiscalizado.dt_updated;

			//Request Header Config apenas necessário para updates
			var config = {headers: {'If-Match': fiscalizado._etag.$oid}};

			Fiscalizados.updateDate(fiscalizado._id.$oid, fiscalizado._etag.$oid, $scope.data).then(function (result){
				console.log('Data - UUID: '+ myCache.get('uuid') +' Convenio: ' +  fiscalizado.convenio.NR_CONVENIO + ' foi atualizado!');
			});   	  
	}

	

	$scope.refreshFiscalizados = function() {
		$scope.requisitionFiscalizados();
	}

	$scope.atualizaData = function(fiscalizado) {

		console.log('data ANTES: ' + fiscalizado.dt_updated);
		fiscalizado.dt_updated = new Date();
		console.log('data DEPOIS: ' + fiscalizado.dt_updated);
		$scope.atualizaFiscalizado(fiscalizado);
		$scope.verificaRecentes();
		$location.path('/detalhe/'+fiscalizado.convenio.NR_CONVENIO);
	}

	$scope.requisitionFiscalizados();

});
