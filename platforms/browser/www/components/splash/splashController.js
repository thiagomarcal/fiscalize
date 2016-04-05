myApp.controller('SplashController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache)  {

	//Capture Mobile UUID
	document.addEventListener("deviceready", function () {
		var uuid = $cordovaDevice.getUUID();
		if (angular.isUndefined(uuid) || uuid == null) {
			uuid = 'b07b42e74b01efed'
		};
		myCache.put('uuid', uuid);
	}, false);

	$location.path('/home');
	
});