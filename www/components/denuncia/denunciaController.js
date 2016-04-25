myApp.controller('DenunciaController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, myCache, $cordovaCamera)  {

	//Parametros
	$scope.params = $routeParams;

	// Initial Values
	page = 1;
	$scope.denuncia = {};
	$scope.denuncia.NR_CONVENIO = parseInt($scope.params.convenioId);
	$scope.tipoDenuncias = [ 
	    { id: 1, name: 'Escolha da entidade'},
	    { id: 2, name: 'Formalização de convênios'},
	    { id: 3, name: 'Prestações de contas e nos objetivos dos convênios'},
	    { id: 4, name: 'Alcance dos objetivos firmados'},
	    { id: 5, name: 'Outros'}
	];

	// Const Values
	PAGESIZE = 10;
	ADDRESS= 'http://74.124.24.115:8080'
	COLLECTION = 'Denuncias'


	$scope.denunciar = function() {

		$scope.denuncia.uuid = myCache.get('uuid');
		
		requisicaoFactory.postRequest(ADDRESS+'/hackathon/'+ COLLECTION, $scope.denuncia).then(function(result) {
			alert($scope.denuncia.tipo + ' enviado(a)!');
			 $location.path("/home");
		}, function(reason) {
		    alert("Erro ver console!")
		    console.log("reason:", reason);
		    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
		}, function(update) {
		    console.log("update:", update);
		})
	}

	$scope.selecionarTipo = function(tipo) {
		$scope.denuncia.tipo = tipo;
	}


	$scope.tipoDefinido = function() {
		return $scope.denuncia.tipo != undefined;
	}

	$scope.tirarFoto = function() {

		var options = {
	      quality: 80,
	      destinationType: Camera.DestinationType.FILE_URI,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: false,
	      encodingType: Camera.EncodingType.JPEG,
	      // targetWidth: 250,
	      //targetHeight: 200,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false,
		  correctOrientation:true
	    };

	    $cordovaCamera.getPicture(options).then(function(imageURI) {
			var image = document.getElementById('myImage');
			image.src = imageURI;

	    }, function(err) {
	      // error
	    });
	}

});
