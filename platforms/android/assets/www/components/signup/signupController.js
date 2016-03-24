myApp.controller('SignupController', function($scope, $http, $location, $routeParams, requisicaoFactory)  {
    
    $scope.newUser = function() {

		requisicaoFactory.postRequest('http://74.124.24.115:8080/hackathon/Usuario', $scope.user).then(function(valorRetornado) {
		    // sweetAlert("Pronto!", valorRetornado.mensagem, "success");
		    alert("Cadastro efetuado com sucesso!")
		    $location.path("/home");
		}, function(reason) {
		     alert("Erro ver console!")
		    console.log("reason:", reason);
		    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
		}, function(update) {
		    console.log("update:", update);
		})

		requisicaoFactory

    }

});