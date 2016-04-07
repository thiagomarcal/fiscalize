myApp.controller('MainController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache, Fiscalizados)  {

	ADDRESS= 'http://74.124.24.115:8080'

  	// Requisition Fiscalizados
	$scope.requisitionFiscalizados = function() {

			requisicaoFactory.getRequest(ADDRESS+'/hackathon/Fiscalizados?filter={uuid:"'+ myCache.get('uuid') +'"},{situacao:1}&hal=f').then(function(result) {
			Fiscalizados.setLista(angular.fromJson(result._embedded["rh:doc"]));
			$scope.fiscalizados = Fiscalizados.getLista();

			// angular.forEach(Fiscalizados.getLista(), function(value, key) {

			// 	$scope.requisitionConvenio(value.convenio.NR_CONVENIO);

			// 	if (angular.isDefined($scope.convenioFiscalizado)) {
			// 		// Fiscalizados Recentes
			// 		if (new Date(value.dt_updated) < new Date($scope.convenioFiscalizado._created_on)) {
			// 			value.recente = 1;
			// 		}
			// 	}
			// });	
			

			




			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})			  
	}


	// $scope.requisitionConvenio = function(nr_convenio) {

		

	// 		requisicaoFactory.getRequest(ADDRESS+'/hackathon/ConveniosProgramasFTS?filter={NR_CONVENIO:'+ nr_convenio +'}&hal=f').then(function(result) {
	// 		$scope.convenioFiscalizado = angular.fromJson(result._embedded["rh:doc"])[0];

	// 		}, function(reason) {
	// 		     alert("Erro ver console!")
	// 		    console.log("reason:", reason);
	// 		    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
	// 		}, function(update) {
	// 		    console.log("update:", update);
	// 		})			  
	// }

	


	$scope.requisitionConvenio = function() {

			temp = ""
			i = 0;
			angular.forEach(Fiscalizados.getLista(), function(value, key) {
				temp += value.convenio.NR_CONVENIO;
				temp += (Fiscalizados.getLista().length - 1) == i?'':',';
				i++;
			});	

			filtro = "?filter={NR_CONVENIO: {$in:["+temp+"]}}";

			requisicaoFactory.getRequest(ADDRESS+'/hackathon/ConveniosProgramasFTS'+filtro).then(function(result) {
				$scope.conveniosFiscalizados = angular.fromJson(result._embedded["rh:doc"]);
				$scope.mapaConveniosFiscalizados = {};

				angular.forEach($scope.conveniosFiscalizados, function(value, key) {
					numeroConvenio = value.NR_CONVENIO;
					$scope.mapaConveniosFiscalizados[numeroConvenio] = value;
					// $scope.mapaConveniosFiscalizados.push({numeroConvenio: value});
				});

				$scope.verificaRecentes();		

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
						  
	}


	$scope.verificaRecentes = function() {
		angular.forEach(Fiscalizados.getLista(), function(value, key) {

				if (angular.isDefined($scope.mapaConveniosFiscalizados)) {
					
					// Fiscalizados Recentes
					if (new Date(value.dt_updated) < new Date($scope.mapaConveniosFiscalizados[value.convenio.NR_CONVENIO].lastUpdateDate.$date)) {
						value.recente = 1;
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

			requisicaoFactory.patchRequest(ADDRESS+'/hackathon/Fiscalizados/'+ fiscalizado._id.$oid, $scope.data, config).then(function(result) {
			
				alert('UUID: '+ myCache.get('uuid') +' Convenio: ' +  fiscalizado.convenio.NR_CONVENIO + 'Atualizado!');

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})			  
	}

	

	$scope.refreshFiscalizados = function() {
		$scope.requisitionConvenio();
	}

	$scope.atualizaData = function(fiscalizado) {

		console.log('data ANTES: ' + fiscalizado.dt_updated);
		fiscalizado.dt_updated = new Date();
		console.log('data DEPOIS: ' + fiscalizado.dt_updated);
		$scope.atualizaFiscalizado(fiscalizado);
		$location.path('/detalhe/'+fiscalizado.convenio.NR_CONVENIO);
	}


	$scope.requisitionFiscalizados();

});
