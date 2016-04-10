var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'angular-svg-round-progressbar', 'chart.js','tc.chartjs','ngCordova', 'angular-simple-chat', 'ngMeta', 'ngPercentDisplay', '720kb.tooltips']);
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
        })
    .when('/minhasmanifestacoes', {
        templateUrl: 'components/denuncia/minhasmanifestacoes.html',
        controller: 'MinhasManifestacoesController'
        });
});

myApp.config(function($httpProvider) {

    $httpProvider.interceptors.push(function($q) {
        return {
         'request': function(config) {
             $('#processing').show();
             return config;
          },

          'response': function(response) {
             $('#processing').hide();
             return response;
          }
        };
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

        var listaConvenios = [];
        var totalConvenios;

        function getLista() {
            return listaConvenios;
        }

        function setLista(novaLista) {
            listaConvenios = novaLista;
        }

        function getListaFilter(filter) {
            return $http({
            "method": "get",
            "url": "http://74.124.24.115:8080/hackathon/ConveniosProgramasFTS"+filter
            });
        }

        function getTotal() {
            return totalConvenios;
        }

        function setTotal(novoTotal) {
            totalConvenios = novoTotal;
        }

        return {
            getLista: getLista,
            setLista: setLista,
            getTotal: getTotal,
            setTotal: setTotal,
            getListaFilter: getListaFilter,

        }
});


myApp.service("Search", function (myCache, $http) {

        var search;
        var estado;
        var cidade;
        var ministerio;
        var situacao;


        function getSearch() {
            return search;
        }

        function setSearch(newSearch) {
            search = newSearch;
        }

        function getEstado() {
            return estado;
        }

        function setEstado(newEstado) {
            estado = newEstado;
        }

        function getCidade() {
            return cidade;
        }

        function setCidade(newCidade) {
            cidade = newCidade;
        }

        function getMinisterio() {
            return ministerio;
        }

        function setMinisterio(newMinisterio) {
            ministerio = newMinisterio;
        }

        function getSituacao() {
            return situacao;
        }

        function setSituacao(newSituacao) {
            situacao = newSituacao;
        }

        return {
            getSearch: getSearch,
            setSearch: setSearch,

            getEstado: getEstado,
            setEstado: setEstado,

            getCidade: getCidade,
            setCidade: setCidade,

            getMinisterio: getMinisterio,
            setMinisterio: setMinisterio,

            getSituacao: getSituacao,
            setSituacao: setSituacao,
        }
});

myApp.service("Page", function (myCache, $http) {

        var scrollPos;

        function getScrollPos() {
            return scrollPos;
        }

        function setScrollPos(newScrollPos) {
            scrollPos = newScrollPos;
        }

        return {
            getScrollPos: getScrollPos,
            setScrollPos: setScrollPos,
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