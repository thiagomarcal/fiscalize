myApp.controller('HomeController', function($scope, $timeout, $window,$http, $location, $routeParams, requisicaoFactory, $cordovaDevice, myCache, Fiscalizados, $cordovaSocialSharing, $cordovaGeolocation,ngMeta, Convenios, Search, Page,GoogleMaps, Estados, Municipios, Ministerios, Situacoes, Contador, Numeros, NumReclamacoes, NumDenuncias, NumElogios, Categorias) {

    // Page Initial Value
    page = 1;

    // Const Values
    PAGESIZE = 20;
    ADDRESS = 'http://74.124.24.115:8080'
    COLLECTION = 'ConveniosProgramasFTS'

     // Watcher para retorno da Geolocalizacao
    $scope.$watch(function(){return GoogleMaps.getEstadoGoogleMaps()}, function(NewValue, OldValue){
            
        angular.forEach(Estados.get(), function(value, key) {
            if (value.UF_PROPONENTE == NewValue) {                            
                    $scope.estadoSelecionado = value;
            }
        });

    }, true);

    // Requisition Home 
    $scope.home = function() {

        console.log('inicio home');

        $scope.restorePreviousHome();

        if (angular.isUndefined($scope.convenios)) {
            $scope.convenios = [];

            var estado = angular.isUndefined(GoogleMaps.getEstadoGoogleMaps()) ? "DF" : GoogleMaps.getEstadoGoogleMaps();

            $scope.url = '/hackathon/' + COLLECTION + '?count&page=' + page + '&pagesize=' + PAGESIZE +'&filter={UF_PROPONENTE:"'+ estado +'"}'+'&hal=f';
            $scope.requisition();
        };
    }

    // Requisition Search 
    $scope.search = function() {

        if ($scope.estadoSelecionado!=null) {

            Search.setSearch($scope.searchParam);
            Search.setEstado($scope.estadoSelecionado);
            Search.setCidade($scope.cidadeSelecionado);
            Search.setMinisterio($scope.ministerioSelecionado);
            Search.setSituacao($scope.situacaoSelecionado);
            Search.setEsfera($scope.esferaSelecionado);

            $scope.flagQtdRetornados = true;

            $scope.convenios = [];
            estado = angular.isUndefined($scope.estadoSelecionado) ? "" : $scope.estadoSelecionado.UF_PROPONENTE;
            cidade = angular.isUndefined($scope.cidadeSelecionado) ? "" : $scope.cidadeSelecionado.NM_MUNICIPIO_PROPONENTE;
            ministerio = angular.isUndefined($scope.ministerioSelecionado) ? "" : $scope.ministerioSelecionado.NM_ORGAO_SUPERIOR;
            situacao = angular.isUndefined($scope.situacaoSelecionado) ? "" : $scope.situacaoSelecionado.TX_SITUACAO;
            esfera = angular.isUndefined($scope.esferaSelecionado) ? "" : $scope.esferaSelecionado;
            search = $scope.searchParam==null || angular.isUndefined($scope.searchParam) ? "" : $scope.searchParam;

            filtros = [
                {campo: 'UF_PROPONENTE', objeto: estado, result: 'UF_PROPONENTE:{$regex:"' + estado + '"}'},
                {campo: 'NM_MUNICIPIO_PROPONENTE', objeto: cidade, result: 'NM_MUNICIPIO_PROPONENTE:{$regex:"' + cidade + '"}'},
                {campo: 'NM_ORGAO_SUPERIOR', objeto: ministerio,result: 'NM_ORGAO_SUPERIOR:{$regex:"' + ministerio + '"}' },
                {campo:'TX_SITUACAO', objeto: situacao,result: 'TX_SITUACAO:{$regex:"' + situacao + '"}'},
                {campo:'TX_ESFERA_ADM_PROPONENTE', objeto: esfera,result: 'TX_ESFERA_ADM_PROPONENTE:{$regex:"' + esfera + '"}'},
                {campo:'SEARCH', objeto: search ,result: parseSearchString(search)}
            ]

            filtro = montaFiltro(filtros, '&sort_by=DT_INICIO_VIGENCIA');

            // $scope.url = '/hackathon/' + COLLECTION + '?count&page=' + page + '&pagesize=' + PAGESIZE + '&filter={UF_PROPONENTE:{$regex:"' + estado + '"},NM_MUNICIPIO_PROPONENTE:{$regex:"' + cidade + '"},TX_SITUACAO:{$regex:"' + situacao + '"},NM_ORGAO_SUPERIOR:{$regex:"' + ministerio + '"}' + textSearchArg + '}&sort_by=DT_INICIO_VIGENCIA&hal=f';$scope.url = '/hackathon/' + COLLECTION + '?count&page=' + page + '&pagesize=' + PAGESIZE + '&filter={UF_PROPONENTE:{$regex:"' + estado + '"},NM_MUNICIPIO_PROPONENTE:{$regex:"' + cidade + '"},TX_SITUACAO:{$regex:"' + situacao + '"},NM_ORGAO_SUPERIOR:{$regex:"' + ministerio + '"}' + textSearchArg + '}&sort_by=DT_INICIO_VIGENCIA&hal=f';
            $scope.url = '/hackathon/' + COLLECTION + '?count&page=' + page + '&pagesize=' + PAGESIZE + ''+ filtro +'&hal=f';

            $scope.requisition();    
        }
        else {
            alert("É necessário selecionar um Estado");
        }

    }

    // Requisition Scroll 
    $scope.loadMore = function() {
        $scope.requisition();
    };

    $scope.flagSearch = function(show) {

    	if($scope.advSearch && $scope.advSearch == show)
    		show = false;

        $scope.advSearch = show;
    }

    // Requisition Convenios
    $scope.requisition = function() {

    	$scope.flagSearch(false);
        convenios_temp = [];

        if ($scope.url != null) {

            $scope.totalConvenios = 0;

            requisicaoFactory.getRequest(ADDRESS + $scope.url).then(function(result) {

                if (result._size > 0) {
                    convenios_temp = angular.fromJson(result._embedded["rh:doc"]);
                    
                    angular.forEach(convenios_temp, function(value, key) {

                        value = $scope.prepareConvenioDetail(value);

                        Numeros.getNumReclamacoes(value.NR_CONVENIO).then(function(result) {
                          value.num_reclamacoes = NumReclamacoes.get();
                        });

                        Numeros.getNumDenuncias(value.NR_CONVENIO).then(function(result) {
                          value.num_denuncias = NumDenuncias.get();
                        });
                        
                        Numeros.getNumElogios(value.NR_CONVENIO).then(function(result) {
                          value.num_elogios = NumElogios.get();
                        });

                        $scope.convenios.push(value);

                        $scope.totalConvenios = result._size;
                        Convenios.setTotal($scope.totalConvenios);

                    });

                    Convenios.setLista($scope.convenios);

                }

                $scope.url = angular.isDefined(result._links.next) ? result._links.next.href : null;

            }, function(reason) {
                alert("Pesquisa muito abrangente, favor restringir através dos filtros avançados!");
                console.log("reason:", reason);
                // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
            }, function(update) {
                console.log("update:", update);
            })
        }
    }


    $scope.estadoChange = function() {
            if ($scope.estadoSelecionado != null) {
                $scope.requisitionCidades($scope.estadoSelecionado);
            };
        }
        // Requisition Cidades
    $scope.requisitionCidades = function(estado) {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/Municipios?pagesize=1000&filter={UF_PROPONENTE:"' + estado.UF_PROPONENTE + '"}&sort_by=NM_MUNICIPIO_PROPONENTE').then(function(result) {

            $scope.cidades = angular.fromJson(result._embedded["rh:doc"]);
            Municipios.set($scope.cidades);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }


    $scope.fiscalizar = function(convenio) {


        convenio_fiscalizado = {};
        convenio_fiscalizado.NR_CONVENIO = convenio.NR_CONVENIO;
        convenio_fiscalizado.NM_ORGAO_SUPERIOR = convenio.NM_ORGAO_SUPERIOR;
        convenio_fiscalizado.TX_SITUACAO = convenio.TX_SITUACAO;
        convenio_fiscalizado.DT_INICIO_VIGENCIA = convenio.DT_INICIO_VIGENCIA;
        convenio_fiscalizado.DT_FIM_VIGENCIA = convenio.DT_FIM_VIGENCIA;
        convenio_fiscalizado.VL_GLOBAL = convenio.VL_GLOBAL;

        // Create Post Object
        $scope.fiscalizado = {};
        $scope.fiscalizado.uuid = myCache.get('uuid');
        $scope.fiscalizado.convenio = convenio_fiscalizado;
        $scope.fiscalizado.situacao = 1;
        $scope.fiscalizado.dt_updated = new Date();

        //Post Requisition
        requisicaoFactory.postRequest(ADDRESS + '/hackathon/Fiscalizados', $scope.fiscalizado).then(function(result) {
            alert('A partir de agora você se tornou fiscalizador do convênio ' + $scope.fiscalizado.convenio.NR_CONVENIO + '  e passará a receber notificações toda vez que houverem mudanças no mesmo.');

            $scope.refreshFiscalizados();

        }, function(reason) {
            alert("Convenio já está sendo Fiscalizado!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }


    $scope.midiaShare = function(convenio) {

		link = 'http://74.124.24.115:8000/#/detalhe/' + convenio.NR_CONVENIO

		$cordovaSocialSharing
			.share(null, null, null, link) // Share via native share sheet
				.then(function(result) {
					// Success!
					console.log("teste share!")
				}, function(err) {
					// An error occured. Show a message to the user
				}
		);
	}

	$scope.midiaShareFace = function(convenio) {

		// Meta Dinamico Futura Build
		// ngMeta.setTag('og:title', convenio.NR_CONVENIO)
		// ngMeta.setTag('og:description','balbalbalbabalbalba');
		// ngMeta.setTag('og:image','http://www.sinproesemmabdc.com.br/img/icon_convenios.png');
		
		link = 'http://74.124.24.115:8000/#/detalhe/' + convenio.NR_CONVENIO

		$cordovaSocialSharing
		    .shareViaFacebook(null, null, link)
		    .then(function(result) {
		      // Success!
		    }, function(err) {
		      // An error occurred. Show a message to the user
		});
	}



    $scope.restorePreviousHome = function() {
        //Restore Previous Convenios List
        Convenios.getLista();

        // Verifica se Lista Convenios é nula
        if (Convenios.getLista().length != 0) {
            $scope.convenios = Convenios.getLista();
        }

        // Restore Total
        $scope.totalConvenios = Convenios.getTotal();

        if (Convenios.getTotal()>=0) {
            $scope.flagQtdRetornados = true;
        } 

        // Restore Search Param
        $scope.searchParam = Search.getSearch();

        // Restore AdvSearch
        $scope.estadoSelecionado = Search.getEstado();
        $scope.cidadeSelecionado = Search.getCidade();
        $scope.ministerioSelecionado = Search.getMinisterio();
        $scope.situacaoSelecionado = Search.getSituacao();
        $scope.esferaSelecionado = Search.getEsfera();
        
    }

    $scope.limparBusca = function () {
        delete $scope.searchParam;
        delete $scope.estadoSelecionado;
        delete $scope.cidadeSelecionado;
        delete $scope.ministerioSelecionado;
        delete $scope.situacaoSelecionado;
        delete $scope.esferaSelecionado;
    }

    //Reposição do Scroll ao Voltar - Futura Build

    // $scope.setPageProperties = function() {
    //     var ScrollPos = retrieveScrollableContent().scrollableContent.scrollTop;
    //     Page.setScrollPos(ScrollPos);
    // }

    $scope.cacheConvenio = function(convenio) {
        Convenios.set(convenio); 
    }

    // function retrieveScrollableContent() {
    //     var elem = angular.element("#homeScroll");
    //     var sc = elem.controller('scrollableContent');
    //     return sc;
    // }

    // $scope.$watch("convenios", function () {
    //         if (angular.isDefined(Page.getScrollPos())) {
    //           retrieveScrollableContent().scrollTo(Page.getScrollPos());
    //       }
    // });
    
    function parseSearchString (searchValue) {

        if(searchValue.split(" ").lenght > 1)
            {
                searchValue = '\"' + searchValue.replace(' ', '+') + '\"';
            }

        return '$text:{$search:"' + searchValue + '"}';
    }

    function montaFiltro (lista, sort) {
        var filter = '&filter={'
        var i = 0;
        angular.forEach(filtros, function(value, key){

            if (value.objeto != "") {
                filter += value.result;

                var nextObject = filtros[key+1 % filtros.length];

                filter += (angular.isDefined(nextObject)) ? ',' : '';
            };

            if (filtros.length - 1 == i) {
                if (filter == '&filter={') {
                    filter = '';
                } 
                else {
                    filter += '}'
                    filter += sort
                };
            };

            i++;

        });

        return filter;
    }


    // Initial Call Home
    $scope.estados = Estados.get();
    $scope.home();
    $scope.ministerios = Ministerios.get();
    $scope.situacoes = Situacoes.get();
    $scope.cidades = Municipios.get();
    $scope.categorias = Categorias.get();
    $scope.refreshFiscalizados();
    
});
