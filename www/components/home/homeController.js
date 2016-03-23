myApp.controller('HomeController', function($scope, $timeout , $http, $location, $stateParams, requisicaoFactory)  {


	$scope.slickConfig = {
	    enabled: true,
	    autoplay: false,
	    draggable: false,  
	    autoplaySpeed: 3000,
	    method: {},
	    event: {
	        beforeChange: function (event, slick, currentSlide, nextSlide) {
	        },
	        afterChange: function (event, slick, currentSlide, nextSlide) {
	        }
	    }
	};



	$http({method: 'GET', url: 'http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page=1&pagesize=10'}).
    	success(function(data, status, headers, config) {
            $scope.convenios = data._embedded["rh:doc"];
    });

 //    requisicaoFactory.getRequest('http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page=1&pagesize=10').then(function(valorRetornado) {
	//     $scope.convenios =  angular.fromJson(valorRetornado._embedded["rh:doc"]);
	// }, function(reason) {
	//      alert("Erro ver console!")
	//     console.log("reason:", reason);
	//     // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
	// }, function(update) {
	//     console.log("update:", update);
	// })

	

	// $scope.search = function(input) {
		
	// 	requisicaoFactory.getRequest("http://74.124.24.115:8080/hackathon/ConveniosProgramas?count&page=1&pagesize=3&filter={$text:{$search:'"+input+"'}}&sort_by=DT_INICIO_VIGENCIA").then(function(valorRetornado) {
	// 		$scope.convenios =  angular.fromJson(valorRetornado._embedded["rh:doc"]);
	// 	}, function(reason) {
	// 		console.log("reason:", reason);
	// 	//	util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
	// 	}, function(update) {
	// 		console.log("update:", update);
	// 	});
			
	// }
});
