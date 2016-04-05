myApp.controller('DetalheController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory, myCache)  {

	//Parametros
	$scope.params = $routeParams;

	ADDRESS= 'http://74.124.24.115:8080'

	// Requisition
	$scope.requisitionDetail = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/ConveniosProgramasFTS?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.convenio = angular.fromJson(result._embedded["rh:doc"])[0];

				$scope.valorPlano = parseFloat($scope.convenio.VL_GLOBAL.replace(/[^0-9\.]+/g,""));
				$scope.valorDesembolso = parseFloat($scope.convenio.VL_DESEMBOLSADO.replace(/[^0-9\,]+/g,""));

				$scope.remaining = ((100*$scope.valorDesembolso)/$scope.valorPlano);

				$scope.totalCronogramaFisico = 0;
				angular.forEach($scope.convenio.CronogramaFisicoPTs, function(value, key) {
					if (angular.isDefined(value.VL_META) || value.VL_META != null) {
				    	$scope.totalCronogramaFisico += parseFloat(value.VL_META.replace(/[^0-9\,]+/g,""));
					};
				});	

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}


	// Requisition
	$scope.requisitionPlano = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/PlanoAplicacaoPT?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.planoAplicacao = angular.fromJson(result._embedded["rh:doc"]);

				$scope.totalPlano = 0;
				angular.forEach($scope.planoAplicacao, function(value, key) {
					if (angular.isDefined(value.VL_TOTAL) || value.VL_TOTAL != null) {
				    	value.VL_TOTAL_FLOAT = parseFloat(value.VL_TOTAL.replace(/[^0-9\,]+/g,""));
				    	value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
					};
				});	

				var linq = Enumerable.From($scope.planoAplicacao);
				var result =
			    linq.GroupBy(function(x){ return x["DESPESA"]; })
			        .Select(function(x){
			          return {
			            label: x.Key(),
			            color: $scope.getRandomColor(),
			            value: x.Sum(function(y){ return y["VL_TOTAL_FLOAT"]|0; })
			          };
			        }).ToArray();


				$scope.dataPlanoAplicacao = result;

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}

	$scope.requisitionCronogramaFisico = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/CronogramaFisicoPT?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.cronogramaFisico = angular.fromJson(result._embedded["rh:doc"]);

				angular.forEach($scope.cronogramaFisico, function(value, key) {
					value.label = value.TX_ESPECIFICACAO;
			            value.color = $scope.getRandomColor();
			            value.value = value.VL_META_FLOAT;
				});	

				$scope.dataCronogramaFisico = $scope.cronogramaFisico;

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);
			})
	}

	$scope.requisitionCronogramaDesembolso = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/CronogramaDesembolsoPT?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.cronogramaDesembolso = angular.fromJson(result._embedded["rh:doc"]);

				if($scope.cronogramaDesembolso == undefined)
					return;
				angular.forEach($scope.cronogramaDesembolso, function(value, key) {
					value.Data = value.TX_MES + "/" + value.TX_ANO;
				});	


				$scope.dataCronogramaDesembolso = {
			      labels: ['02/2016', '03/2016', '04/2016', '05/2016', '06/2016', '07/2016', '08/2016','09/2016','10/2016','11/2016'],
			      datasets: [
			        {
			          label: 'CONVENENTE',
			          fillColor: 'rgba(220,220,220,0.2)',
			          strokeColor: 'rgba(220,220,220,1)',
			          pointColor: 'rgba(220,220,220,1)',
			          pointStrokeColor: '#fff',
			          pointHighlightFill: '#fff',
			          pointHighlightStroke: 'rgba(220,220,220,1)',
			          data: [65, 59, 80, 81, 56, 55, 40, 66, 37, 60]
			        },
			        {
			          label: 'CONCEDENTE',
			          fillColor: 'rgba(151,187,205,0.2)',
			          strokeColor: 'rgba(151,187,205,1)',
			          pointColor: 'rgba(151,187,205,1)',
			          pointStrokeColor: '#fff',
			          pointHighlightFill: '#fff',
			          pointHighlightStroke: 'rgba(151,187,205,1)',
			          data: [28, 48, 40, 19, 86, 27, 90, 86, 27, 90]
			        }
			      ]
			    };

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}

	$scope.requisitionExecucaoFinanceira = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/ExecucaoFinanceira?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.execucaoFinanceira = angular.fromJson(result._embedded["rh:doc"]);

				angular.forEach($scope.execucaoFinanceira, function(value, key) {
					if (angular.isDefined(value.VL_DESEMBOLSADO) || value.VL_DESEMBOLSADO != null) {
				    	value.VL_DESEMBOLSADO_FLOAT = parseFloat(value.VL_DESEMBOLSADO.replace(/[^0-9\,]+/g,""));
				    	//value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
					};
				});	

				var linq = Enumerable.From($scope.execucaoFinanceira);
				var result =
			    linq.GroupBy(function(x){ return x["DT_DESEMBOLSO"]; })
			        .Select(function(x){
			          return {
			            label: x.Key(),
			            color: $scope.getRandomColor(),
			            value: x.Sum(function(y){ return y["VL_DESEMBOLSADO_FLOAT"]|0; })
			          };
			        }).ToArray();


				$scope.dataExecucaoFinanceira = result;

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}

	$scope.requisitionPagamentoOBTV = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/PagamentoOBTV?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.pagamentoOBTV = angular.fromJson(result._embedded["rh:doc"]);

				//angular.forEach($scope.pagamentoOBTV, function(value, key) {
				//	if (angular.isDefined(value.VL_PAGAMENTO) || value.VL_PAGAMENTO != null) {
				//    	value.VL_PAGAMENTO_FLOAT = parseFloat(value.VL_PAGAMENTO.replace(/[^0-9\,]+/g,""));
				//    	//value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
				//	};
				//});	

				var linq = Enumerable.From($scope.pagamentoOBTV);
				var result =
			    linq.GroupBy(function(x){ return x["DT_INCLUSAO_MOV_FINANCEIRA"]; })
			        .Select(function(x){
			          return {
			            label: x.Key(),
			            color: $scope.getRandomColor(),
			            value: x.Sum(function(y){ return y["VL_PAGAMENTO_FLOAT"]|0; })
			          };
			        }).ToArray();


				$scope.dataPagamentoOBTV = result;

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}

	$scope.requisitionDocumentoLiquidacao = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/DocumentoLiquidacao?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.documentoLiquidacao = angular.fromJson(result._embedded["rh:doc"]);

				angular.forEach($scope.documentoLiquidacao, function(value, key) {
					if (angular.isDefined(value.VL_LIQUIDO_DL) || value.VL_LIQUIDO_DL != null) {
				    	value.VL_LIQUIDO_DL_FLOAT = parseFloat(value.VL_LIQUIDO_DL.replace(/[^0-9\,]+/g,""));
				    	//value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
					};
				});	

				var linq = Enumerable.From($scope.documentoLiquidacao);
				var result =
			    linq.GroupBy(function(x){ return x["NM_IDENTIF_FAVORECIDO_DL"]; })
			        .Select(function(x){
			          return {
			            label: x.Key(),
			            color: $scope.getRandomColor(),
			            value: x.Sum(function(y){ return y["VL_LIQUIDO_DL_FLOAT"]|0; })
			          };
			        }).ToArray();


				$scope.dataDocumentoLiquidacao = result;

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}

	$scope.requisitionDiscriminacaoOBTV = function() {

				requisicaoFactory.getRequest(ADDRESS+'/hackathon/DiscriminacaoOBTV?filter={NR_CONVENIO:'+parseInt($scope.params.convenioId)+'}').then(function(result) {
				$scope.discriminacaoOBTV = angular.fromJson(result._embedded["rh:doc"]);

				angular.forEach($scope.discriminacaoOBTV, function(value, key) {
					if (angular.isDefined(value.VL_PAGAMENTO) || value.VL_PAGAMENTO != null) {
				    	value.VL_PAGAMENTO_FLOAT = parseFloat(value.VL_PAGAMENTO.replace(/[^0-9\,]+/g,""));
				    	//value.DESPESA = value.TP_DESPESA + " - " + value.NM_NATUREZADESPESA;
					};
				});	

				var linq = Enumerable.From($scope.discriminacaoOBTV);
				var result =
			    linq.GroupBy(function(x){ return x["TX_TIPO_AQUISICAO"]; })
			        .Select(function(x){
			          return {
			            label: x.Key(),
			            color: $scope.getRandomColor(),
			            value: x.Sum(function(y){ return y["VL_PAGAMENTO_FLOAT"]|0; })
			          };
			        }).ToArray();


				$scope.dataDiscriminacaoOBTV = result;

			}, function(reason) {
			     alert("Erro ver console!")
			    console.log("reason:", reason);
			    // util._error(reason.data, reason.status, reason.headers, reason.config, $scope);
			}, function(update) {
			    console.log("update:", update);s
			})
	}

$scope.getRandomColor = function () {
		   var letters = '0123456789ABCDEF'.split('');
		   var color = '#';
		   for (var i = 0; i < 6; i++ ) {
		       color += letters[Math.floor(Math.random() * 16)];
		   }
   			return color;
		}

    // Chart.js Options
    $scope.options =  {

      // Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : '#fff',

      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 50, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : 'easeOutBounce',
      
      // Boolean - If we should show the scale at all
	  showScale: true,

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };

    $scope.optionsLine =  {

      // Sets the chart to be responsive
      responsive: true,

      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - Whether the line is curved between points
      bezierCurve : true,

      //Number - Tension of the bezier curve between points
      bezierCurveTension : 0.4,

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 4,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      // Function - on animation progress
      onAnimationProgress: function(){},

      // Function - on animation complete
      onAnimationComplete: function(){},

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };




	$scope.requisitionDetail();

	$scope.checkDate = function (date) {
		return (new Date() < new Date(date));
	}

	

});
