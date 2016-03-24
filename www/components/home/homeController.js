myApp.controller('HomeController', function($scope, $timeout , $http, $location, $stateParams, requisicaoFactory)  {

	$scope.convenios = []
	page = 1;

	//Requisition Convenios Factory
	requisicaoConvenios = function(page, pagesize) {

				$scope.flag = false;

				requisicaoFactory.getRequest('http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page='+ page +'&pagesize='+ pagesize +'').then(function(valorRetornado) {
				convenios_temp = angular.fromJson(valorRetornado._embedded["rh:doc"]);

			    angular.forEach(convenios_temp, function(value, key) {
			    	$scope.convenios.push(value);
				});

				$scope.flag = true;

				page++;

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

	$scope.slickConfig = {
	    enabled: true,
	    infinite: false,
	    autoplay: false,
	    draggable: true,  
	    autoplaySpeed: 3000,
	    method: {
	    	slickGoTo: function (index, dontAnimate) {
	    		console.log("slickGoTo");
	        }
	    },
	    event: {
	        beforeChange: function (event, slick, currentSlide, nextSlide) {
	        },
	        swipe: function (event, slick, direction) {
	        	console.log("Direction: " + direction);
	        },
	        afterChange: function (event, slick, currentSlide, nextSlide) {

	        	if (currentSlide ==  ($scope.convenios.length -1)) {
	        		requisicaoConvenios(page,10);
	        		$scope.slickConfig.method.slickGoTo(currentSlide,true);
	        	};

	        	console.log(slick);
	        	console.log("Slide: " + currentSlide + " Vetor: " + $scope.convenios.length);
	        }
	    }
	};

});
