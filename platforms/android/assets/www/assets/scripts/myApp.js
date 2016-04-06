var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'angular-svg-round-progressbar', 'chart.js','tc.chartjs','ngCordova']);

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
        });
});



// Set up the cache ‘myCache’
myApp.factory('myCache', function($cacheFactory) {
    return $cacheFactory('myData');
});



myApp.factory("Fiscalizados", function () {

    var listaFiscalizados = [];
    
     function getLista() {
        return listaFiscalizados;
    }
    function setLista(newlistaFiscalizados) {
        listaFiscalizados = newlistaFiscalizados;
    }
    return {
        getLista: getLista,
        setLista: setLista,
    }
});

myApp.run(function(myCache, $cordovaDevice) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady () {

        //Capture Mobile UUID
        var uuid = $cordovaDevice.getUUID();
        if (angular.isUndefined(uuid) || uuid == null) {
            uuid = 'b07b42e74b01efed'
        };
        myCache.put('uuid', uuid);
    }

    console.log(myCache.get('uuid'));
});