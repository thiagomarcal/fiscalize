myApp.controller('HomeController', function($scope, $timeout , $http, $location, $stateParams, requisicaoFactory)  {

	//Requisition Convenios Factory
	$scope.requisicaoConvenios = function(page, pagesize) {

				requisicaoFactory.getRequest('http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page='+ page +'&pagesize='+ pagesize +'').then(function(valorRetornado) {
				$scope.convenios = angular.fromJson(valorRetornado._embedded["rh:doc"]);

			 //    angular.forEach(convenios_temp, function(value, key) {
			 //    	$scope.convenios.push(value);
				// });


			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
	}

	// Requisition Initial Call
	$scope.requisicaoConvenios(1,25);

$( document ).ready(function() {


		 setTimeout(function() {
	        //Simple Slider
	        
	     	var owl = $('.staff-slider-transition');

			//Staff Slider With Transition
		        owl.owlCarousel({
		            autoplay:false,
		            items:1,
		            autoplayTimeout:5000,
		            autoplayHoverPause:true,
		            lazyLoad:false,
		            loop:false,
		            margin:10,
		            nav:false,
		            dots:false	     
		        });


		  //       owl.on('dragged.owl.carousel', function(e) {
		  //       	if (e.item.index === (e.item.count)) {
		  //       		alert("ULTIMO" + "INDEX: " + e.item.index + "Count: " + e.item.count);	
		  //       	}
				// });

		      
	    }, 1000);
	

}); 

});
