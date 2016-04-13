myApp.controller('DetalheController', function($scope, $timeout, $http, $location, $routeParams, requisicaoFactory, myCache) {

    //Parametros
    $scope.params = $routeParams;

    ADDRESS = 'http://74.124.24.115:8080'

    // Requisition
    $scope.requisitionDetail = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/ConveniosProgramasFTS?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.convenio = angular.fromJson(result._embedded["rh:doc"])[0];

            $scope.valorPlano = $scope.getMoney($scope.convenio.VL_GLOBAL);
            $scope.valorDesembolso = $scope.getMoney($scope.convenio.VL_DESEMBOLSADO);

            $scope.remaining = ((100 * $scope.valorDesembolso) / $scope.valorPlano);

            $scope.totalCronogramaFisico = 0;
            angular.forEach($scope.convenio.CronogramaFisicoPTs, function(value, key) {
                if (angular.isDefined(value.VL_META) || value.VL_META != null) {
                    $scope.totalCronogramaFisico += $scope.getMoney(value.VL_META);
                };
            });

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }


    // Requisition
    $scope.requisitionPlano = function(nextRequests) {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/PlanoAplicacaoPT?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                $scope.executeNextRequest(nextRequests);
                return;
            }
            $scope.planoAplicacao = angular.fromJson(result._embedded["rh:doc"]);

            $scope.totalPlano = 0;
            angular.forEach($scope.planoAplicacao, function(value, key) {
                if (angular.isDefined(value.VL_TOTAL) || value.VL_TOTAL != null) {
                    value.VL_TOTAL_FLOAT = $scope.getMoney(value.VL_TOTAL);
                    value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
                };
            });

            var linq = Enumerable.From($scope.planoAplicacao);
            var result =
                linq.GroupBy(function(x) {
                    return x["DESPESA"];
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_TOTAL_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();

            $scope.dataPlanoAplicacao = result;

            $scope.executeNextRequest(nextRequests);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }

    $scope.requisitionCronogramaFisico = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/CronogramaFisicoPT?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                return;
            }
            $scope.cronogramaFisico = angular.fromJson(result._embedded["rh:doc"]);

            //angular.forEach($scope.cronogramaFisico, function(value, key) {
            //    value.label = value.TX_ESPECIFICACAO;
            //    value.color = $scope.getRandomColor();
            //    value.value = value.VL_META_FLOAT;
            //});


            var linq = Enumerable.From($scope.cronogramaFisico);

            var result =
                linq.GroupBy(function(x) {
                    return x["TX_ESPECIFICACAO"];
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_META_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();

            $scope.dataCronogramaFisico = result;

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
        })
    }

    $scope.requisitionCronogramaDesembolso = function(nextRequests) {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/CronogramaDesembolsoPT?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                $scope.executeNextRequest(nextRequests);
                return;
            }
            $scope.cronogramaDesembolso = angular.fromJson(result._embedded["rh:doc"]);

            if ($scope.cronogramaDesembolso == undefined)
                return;
            angular.forEach($scope.cronogramaDesembolso, function(value, key) {
                var mes = '' + value.TX_MES;
                if (mes.length == 1)
                    mes = '0' + mes;
                value.Data = mes + "/" + value.TX_ANO;
                if (angular.isDefined(value.VL_PARCELA) || value.VL_PARCELA != null) {
                    value.VL_PARCELA_FLOAT = $scope.getMoney(value.VL_PARCELA);
                }
            });


            $scope.dataCronogramaDesembolso = {
                labels: ['02/2016', '03/2016', '04/2016', '05/2016', '06/2016', '07/2016', '08/2016', '09/2016', '10/2016', '11/2016'],
                datasets: [{
                    label: 'EXECUTOR',
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40, 66, 37, 60]
                }, {
                    label: 'CONCEDENTE',
                    fillColor: 'rgba(151,187,205,0.2)',
                    strokeColor: 'rgba(151,187,205,1)',
                    pointColor: 'rgba(151,187,205,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90, 86, 27, 90]
                }]
            };


            $scope.executeNextRequest(nextRequests);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.requisitionExecucaoFinanceira = function(nextRequests) {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/ExecucaoFinanceira?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                $scope.executeNextRequest(nextRequests);
                return;
            }
            $scope.execucaoFinanceira = angular.fromJson(result._embedded["rh:doc"]);

            angular.forEach($scope.execucaoFinanceira, function(value, key) {
                if (angular.isDefined(value.VL_DESEMBOLSADO) || value.VL_DESEMBOLSADO != null) {
                    value.VL_DESEMBOLSADO_FLOAT = $scope.getMoney(value.VL_DESEMBOLSADO);
                    //value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
                };
            });

            var linq = Enumerable.From($scope.execucaoFinanceira);
            var result =
                linq.GroupBy(function(x) {
                    return x["DT_DESEMBOLSO"].substring(3, 10);
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_DESEMBOLSADO_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();


            $scope.dataExecucaoFinanceira = result;
            $scope.executeNextRequest(nextRequests);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.requisitionPagamentoOBTV = function(nextRequests) {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/PagamentoOBTV?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                $scope.executeNextRequest(nextRequests);
                return;
            }
            $scope.pagamentoOBTV = angular.fromJson(result._embedded["rh:doc"]);

            //angular.forEach($scope.pagamentoOBTV, function(value, key) {
            //  if (angular.isDefined(value.VL_PAGAMENTO) || value.VL_PAGAMENTO != null) {
            //      value.VL_PAGAMENTO_FLOAT = parseFloat(value.VL_PAGAMENTO.replace(/[^0-9\,]+/g,""));
            //      //value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
            //  };
            //});   

            var linq = Enumerable.From($scope.pagamentoOBTV);
            var result =
                linq.GroupBy(function(x) {
                    return x["DT_INCLUSAO_MOV_FINANCEIRA"].substring(3, 10);
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_PAGAMENTO_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();


            $scope.dataPagamentoOBTV = result;

            $scope.executeNextRequest(nextRequests);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.requisitionEmpenhos = function(nextRequests) {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/Empenhos?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                $scope.executeNextRequest(nextRequests);
                return;
            }
            $scope.empenhos = angular.fromJson(result._embedded["rh:doc"]);

            angular.forEach($scope.empenhos, function(value, key) {
                if (angular.isDefined(value.VL_NOTA_EMPENHO) || value.VL_NOTA_EMPENHO != null) {
                    value.VL_NOTA_EMPENHO_FLOAT = $scope.getMoney(value.VL_NOTA_EMPENHO);
                    //value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
                };
            });

            var linq = Enumerable.From($scope.empenhos);
            var result =
                linq.GroupBy(function(x) {
                    return x["DT_EMISSAO_EMPENHO"].substring(3, 10);
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_NOTA_EMPENHO_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();


            $scope.dataEmpenhos = result;

            $scope.executeNextRequest(nextRequests);

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.executeNextRequest = function(nextRequests) {

        if (nextRequests != undefined) {
            var lastRequest = nextRequests.pop();
            if (lastRequest != undefined)
                lastRequest(nextRequests);
        }
    }

    $scope.requisitionDocumentoLiquidacao = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/DocumentoLiquidacao?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                return;
            }
            $scope.documentoLiquidacao = angular.fromJson(result._embedded["rh:doc"]);

            angular.forEach($scope.documentoLiquidacao, function(value, key) {
                if (angular.isDefined(value.VL_LIQUIDO_DL) || value.VL_LIQUIDO_DL != null) {
                    value.VL_LIQUIDO_DL_FLOAT = $scope.getMoney(value.VL_LIQUIDO_DL);
                    //value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
                };
            });

            var linq = Enumerable.From($scope.documentoLiquidacao);
            var result =
                linq.GroupBy(function(x) {
                    return x["NM_IDENTIF_FAVORECIDO_DL"];
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_LIQUIDO_DL_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();


            $scope.dataDocumentoLiquidacao = result;

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.requisitionDiscriminacaoOBTV = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/DiscriminacaoOBTV?filter={NR_CONVENIO:' + parseInt($scope.params.convenioId) + '}').then(function(result) {
            $scope.emptyResultSet = false;
            if (result._embedded == undefined) {
                $scope.emptyResultSet = true;
                return;
            }

            $scope.discriminacaoOBTV = angular.fromJson(result._embedded["rh:doc"]);

            angular.forEach($scope.discriminacaoOBTV, function(value, key) {
                if (angular.isDefined(value.VL_PAGAMENTO) || value.VL_PAGAMENTO != null) {
                    value.VL_PAGAMENTO_FLOAT = $scope.getMoney(value.VL_PAGAMENTO);
                    //value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
                };
            });

            var linq = Enumerable.From($scope.discriminacaoOBTV);
            var result =
                linq.GroupBy(function(x) {
                    return x["TX_TIPO_AQUISICAO"];
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_PAGAMENTO_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();


            $scope.dataDiscriminacaoOBTV = result;

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.requisitionPrograma = function() {
        var filter = '{\\"CD_PROGRAMA\\":"\\"' + $scope.convenio.CD_PROGRAMA + '\\""}';
        requisicaoFactory.getRequest(ADDRESS + '/hackathon/Programas?filter=' + filter).then(function(result) {
            $scope.programa = angular.fromJson(result._embedded["rh:doc"])[0];

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.requisitionProgramaConvenios = function() {

        requisicaoFactory.getRequest(ADDRESS + '/hackathon/ConveniosProgramasFTS?filter={CD_PROGRAMA:"' + $scope.convenio.CD_PROGRAMA + '"}').then(function(result) {
            $scope.programaConvenios = angular.fromJson(result._embedded["rh:doc"]);

            angular.forEach($scope.programaConvenios, function(value, key) {
                if (angular.isDefined(value.VL_GLOBAL) || value.VL_GLOBAL != null) {
                    value.VL_GLOBAL_FLOAT = $scope.getMoney(value.VL_GLOBAL);
                };

                value.DESCRICAO = value.UF_PROPONENTE;

                value = $scope.prepareConvenioDetail(value);
            });

            var linq = Enumerable.From($scope.programaConvenios);
            var result =
                linq.GroupBy(function(x) {
                    return x["DESCRICAO"];
                })
                .Select(function(x) {
                    return {
                        label: x.Key(),
                        color: $scope.getRandomColor(),
                        value: x.Sum(function(y) {
                            return y["VL_GLOBAL_FLOAT"] | 0;
                        })
                    };
                }).OrderByDescending(function(x) {
                    return x.value
                }).ToArray();


            $scope.dataProgramaConvenios = result;

        }, function(reason) {
            alert("Erro ver console!")
            console.log("reason:", reason);
            // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
        }, function(update) {
            console.log("update:", update);
            s
        })
    }

    $scope.requisitionCronogramaFinanceiroXRepasses = function() {

        //$scope.requisitionEmpenhos();
        //$scope.requisitionCronogramaDesembolso();
        //$scope.requisitionExecucaoFinanceira();
        //$scope.requisitionPagamentoOBTV();
        var nextRequests = [$scope.requisitionEvolucaoFinanceira, $scope.requisitionEmpenhos, $scope.requisitionCronogramaDesembolso, $scope.requisitionExecucaoFinanceira, $scope.requisitionPagamentoOBTV];

        $scope.executeNextRequest(nextRequests);

    }

    $scope.requisitionEvolucaoFinanceira = function() {
        $scope.dataEmpenhos = $scope.dataEmpenhos;
        $scope.cronogramaDesembolso = $scope.cronogramaDesembolso;
        $scope.dataExecucaoFinanceira = $scope.dataExecucaoFinanceira;
        $scope.dataPagamentoOBTV = $scope.dataPagamentoOBTV;

        var labelsEmpenho = Enumerable.From($scope.dataEmpenhos).Select(function(x) {
            return { date: $scope.formatarData('01/' + x.label), label: x.label, value: x.value };
        }).ToArray();
        var labelscronogramaDesembolso = Enumerable.From($scope.cronogramaDesembolso).Select(function(x) {
            return { date: $scope.formatarData('01/' + x.Data), label: x.Data, value: x.VL_PARCELA_FLOAT };
        }).ToArray();
        var labelsExecucaoFinanceira = Enumerable.From($scope.dataExecucaoFinanceira).Select(function(x) {
            return { date: $scope.formatarData('01/' + x.label), label: x.label, value: x.value };
        }).ToArray();
        var labelsPagamento = Enumerable.From($scope.dataPagamentoOBTV).Select(function(x) {
            return { date: $scope.formatarData('01/' + x.label), label: x.label, value: x.value };
        }).ToArray();

        var labels = Enumerable.From(labelsEmpenho).Union(labelscronogramaDesembolso).Union(labelsExecucaoFinanceira).Union(labelsPagamento).Distinct("$.label").OrderBy("$.date").Select("$.label").ToArray();

        var dadosEmpenho = [];
        var dadosDesembolso = [];
        var dadosExecucaoFinanceira = [];
        var dadosPagamento = [];
        for (var i = 0; i < labels.length; i++) {
            var currentLabel = labels[i];
            dadosEmpenho[i] = Enumerable.From(labelsEmpenho).Where("$.label == '" + currentLabel + "'").Sum("$.value");
            dadosDesembolso[i] = Enumerable.From(labelscronogramaDesembolso).Where("$.label == '" + currentLabel + "'").Sum("$.value");
            dadosExecucaoFinanceira[i] = Enumerable.From(labelsExecucaoFinanceira).Where("$.label == '" + currentLabel + "'").Sum("$.value");
            dadosPagamento[i] = Enumerable.From(labelsPagamento).Where("$.label == '" + currentLabel + "'").Sum("$.value");
        }

        $scope.emptyResultSet = false;
        $scope.dataCronogramaFinanceiroXRepasses = {
            labels: labels,
            datasets: [{
                label: 'Empenho',
                fillColor: 'rgba(51,153,51,0.2)',
                strokeColor: 'rgba(51,153,51,1)',
                pointColor: 'rgba(51,153,51,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(51,153,51,1)',
                data: dadosEmpenho
            }, {
                label: 'Planejamento',
                fillColor: 'rgba(27,161,226,0.2)',
                strokeColor: 'rgba(27,161,226,1)',
                pointColor: 'rgba(27,161,226,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(27,161,226,1)',
                data: dadosDesembolso
            }, {
                label: 'Repasse',
                fillColor: 'rgba(240,150,9,0.2)',
                strokeColor: 'rgba(240,150,9,1)',
                pointColor: 'rgba(240,150,9,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(240,150,9,1)',
                data: dadosExecucaoFinanceira
            }, {
                label: 'Prestação de Contas',
                fillColor: 'rgba(229,20,0,0.2)',
                strokeColor: 'rgba(229,20,0,1)',
                pointColor: 'rgba(229,20,0,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(229,20,0,1)',
                data: dadosPagamento
            }]
        };
    }

    $scope.getRandomColor = function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 0, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: 'easeOutBounce',

        // Boolean - If we should show the scale at all
        showScale: true,

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% var totalValue = 0; for (var j=0; j<segments.length; j++){ totalValue+= segments[j].value; } for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%> - R$ <%=segments[i].value.formatMoney(2, ",", ".") %> - <%=((segments[i].value / totalValue).toFixed(4)*100).toFixed(2).toString().replace(".", ",")%>% <%}%></li><%}%></ul>'

    };

    $scope.optionsLine = {

        // Sets the chart to be responsive
        responsive: true,

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether the line is curved between points
        bezierCurve: true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        // Function - on animation progress
        onAnimationProgress: function() {},

        // Function - on animation complete
        onAnimationComplete: function() {},

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };




    $scope.requisitionDetail();

    $scope.checkDate = function(date) {
        return (new Date() < new Date(date));
    }



});
