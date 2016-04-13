myApp.controller('MainController', function($scope, $timeout, $http, $location, $routeParams, requisicaoFactory, $cordovaDevice, myCache, Fiscalizados, Convenios) {

    // Requisition Fiscalizado
    $scope.requisitionFiscalizados = function() {
        Fiscalizados.getLista().then(function(result) {
            $scope.fiscalizados = angular.fromJson(result.data._embedded["rh:doc"]);
            $scope.requisitionConvenio();
        });
    }

    // Requisition Convenio
    $scope.requisitionConvenio = function() {

        temp = ""
        i = 0;
        angular.forEach($scope.fiscalizados, function(value, key) {
            temp += value.convenio.NR_CONVENIO;
            temp += ($scope.fiscalizados.length - 1) == i ? '' : ',';
            i++;
        });

        filtro = "?filter={NR_CONVENIO: {$in:[" + temp + "]}}";

        Convenios.getListaFilter(filtro).then(function(result) {

            $scope.conveniosFiscalizados = angular.fromJson(result.data._embedded["rh:doc"]);
            $scope.mapaConveniosFiscalizados = {};

            angular.forEach($scope.conveniosFiscalizados, function(value, key) {
                numeroConvenio = value.NR_CONVENIO;
                $scope.mapaConveniosFiscalizados[numeroConvenio] = value;
            });

            $scope.verificaRecentes();

        });

    }

    // Compara Datas Para ver Recentes
    $scope.verificaRecentes = function() {
        angular.forEach($scope.fiscalizados, function(value, key) {

            if (angular.isDefined($scope.mapaConveniosFiscalizados)) {

                // Fiscalizados Recentes
                $scope.qtdRecentes = 0;
                if (new Date(value.dt_updated) < new Date($scope.mapaConveniosFiscalizados[value.convenio.NR_CONVENIO].lastUpdateDate.$date)) {
                    value.recente = 1;
                    $scope.qtdRecentes++;
                }
            }
        });
    }

    // Requisition Update Fiscalizado
    $scope.atualizaFiscalizado = function(fiscalizado) {
        $scope.data = {};
        $scope.data.dt_updated = fiscalizado.dt_updated;

        //Request Header Config apenas necessário para updates
        var config = { headers: { 'If-Match': fiscalizado._etag.$oid } };

        Fiscalizados.updateDate(fiscalizado._id.$oid, fiscalizado._etag.$oid, $scope.data).then(function(result) {
            console.log('Data - UUID: ' + myCache.get('uuid') + ' Convenio: ' + fiscalizado.convenio.NR_CONVENIO + ' foi atualizado!');
        });
    }



    $scope.refreshFiscalizados = function() {
        $scope.requisitionFiscalizados();
    }

    $scope.atualizaData = function(fiscalizado) {

        console.log('data ANTES: ' + fiscalizado.dt_updated);
        fiscalizado.dt_updated = new Date();
        console.log('data DEPOIS: ' + fiscalizado.dt_updated);
        $scope.atualizaFiscalizado(fiscalizado);
        $scope.verificaRecentes();
        $location.path('/detalhe/' + fiscalizado.convenio.NR_CONVENIO);

        $scope.refreshFiscalizados();
    }

    $scope.abrirChat = function(fiscalizado) {
        $location.path('/chat/' + fiscalizado.convenio.NR_CONVENIO)
    }

    $scope.getMoney = function(str) {
        return parseFloat(parseInt(str.toString().replace(/[\D]+/g, '')) / 100);
    }
    $scope.formatReal = function(int) {
        var tmp = int + '';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
    }

    $scope.diffDays = function(date1, date2)
    {
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        return diffDays;
    }

    $scope.formatarData = function (date) {
        if (!date)
            return date;
        date = $scope.replaceAll("-", "", date);
        date = $scope.replaceAll("/", "", date);
        var yy = date.substring(4, 8),
            mm = date.substring(2, 4),
            dd = date.substring(0, 2);
        return new Date(yy + "-" + mm + "-" + dd);
    };

    $scope.replaceAll = function (find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    };

    $scope.prepareConvenioDetail = function(value) {
        var maxVigencia = $scope.diffDays($scope.formatarData(value.DT_FIM_VIGENCIA, 'DD/MM/YYYY'), $scope.formatarData(value.DT_INICIO_VIGENCIA, 'DD/MM/YYYY'));
        var currentVigencia = $scope.diffDays(new Date(), $scope.formatarData(value.DT_INICIO_VIGENCIA, 'DD/MM/YYYY'));
        value.percentVigencia = ((100 * currentVigencia) / maxVigencia).toFixed(0);
        if (value.percentVigencia > 100)
            value.percentVigencia = 100;

        var valorRepasse = $scope.getMoney(value.VL_REPASSE);
        var valorDesembolso = $scope.getMoney(value.VL_DESEMBOLSADO);

        value.percentDesembolso = ((100 * valorDesembolso) / valorRepasse).toFixed(0);
        return value;
    }

    $scope.requisitionFiscalizados();

});
