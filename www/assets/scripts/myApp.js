<<<<<<< HEAD
var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'angular-svg-round-progressbar', 'chart.js','tc.chartjs','ngCordova', 'angular-simple-chat', 'ngPercentDisplay']);
=======
var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'angular-svg-round-progressbar', 'chart.js','tc.chartjs','ngCordova', 'angular-simple-chat', 'ngMeta']);
>>>>>>> 863a931fd19d9e1812685761db0ebacc9b7ce63f

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
        })
    .when('/denuncia/:convenioId', {
        templateUrl: 'components/denuncia/denuncia.html',
        controller: 'DenunciaController'
        })
    .when('/detalhe/:convenioId', {
        templateUrl: 'components/detalhe/detalhe.html',
        controller: 'DetalheController'
        })
    .when('/chat/:convenioId', {
        templateUrl: 'components/chat/chat.html',
        controller: 'ChatController'
        });
});



// Set up the cache ‘myCache’
myApp.factory('myCache', function($cacheFactory) {
    return $cacheFactory('myData');
});



myApp.service("Fiscalizados", function (myCache, $http) {
    
    function getLista() {
        return $http({
            "method": "get",
            "url": 'http://74.124.24.115:8080/hackathon/Fiscalizados?filter={uuid:"'+ myCache.get('uuid') +'"},{situacao:1}&hal=f'
        });
    }

    function updateDate(oid, etag, data) {
        return $http({
            "method": "patch",
            "headers": {'If-Match': etag},
            "data" : data,
            "url": "http://74.124.24.115:8080/hackathon/Fiscalizados/"+oid
        });
    }

    return {
        getLista: getLista,
        updateDate: updateDate
    }
});

myApp.service("Convenios", function (myCache, $http) {
    
     function getListaFilter(filter) {
        return $http({
            "method": "get",
            "url": "http://74.124.24.115:8080/hackathon/ConveniosProgramasFTS"+filter
        });
    }
    return {
        getListaFilter: getListaFilter,
    }
});


myApp.run(function(myCache, ngMeta, $cordovaDevice) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady () {

        //Capture Mobile UUID
        var uuid = $cordovaDevice.getUUID();
        if (angular.isUndefined(uuid) || uuid == null) {
            uuid = 'b07b42e74b01efed'
        };
        myCache.put('uuid', uuid);
    }

    ngMeta.init();

    console.log(myCache.get('uuid'));
});