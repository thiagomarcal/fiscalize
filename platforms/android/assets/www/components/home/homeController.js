myApp.controller('HomeController', function($scope, $timeout , $http, $location, $stateParams, requisicaoFactory)  {

	//Requisition Convenios Factory
	requisicaoConvenios = function(page, pagesize) {

				requisicaoFactory.getRequest('http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page='+ page +'&pagesize='+ pagesize +'').then(function(valorRetornado) {
				convenios = angular.fromJson(valorRetornado._embedded["rh:doc"]);

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
	}

	// Requisition Initial Call
	requisicaoConvenios(page,10);


	$('.staff-slider-transition').owlCarousel({
    	onTouched: callback
	});

    function callback(){
        alert('Owl has been touched')
    }


});
