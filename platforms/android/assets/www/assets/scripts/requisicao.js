

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

			putRequest: function (url, obj,config) {
				return $http.put(url, obj, config)
					.then(function (result) {
						return result.data;
					}); 
			},

			patchRequest: function (url, obj,config) {
				return $http.patch(url, obj, config)
					.then(function (result) {
						return result.data;
					}); 
			}
	}
	
});
