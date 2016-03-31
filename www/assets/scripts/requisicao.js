

myApp.factory('requisicaoFactory', function($http) {
	
	return {
		
			getRequest : function (url) {
				return $http.get(url)
					.then(function (result) {
						return result.data;
					}); 
			},
	
	
			postRequest: function (url, obj) {
				return $http.post(url, obj)
					.then(function (result) {
						return result.data;
					}); 
			},

			putRequest: function (url, obj) {
				return $http.put(url, obj)
					.then(function (result) {
						return result.data;
					}); 
			}
	}
	
});
