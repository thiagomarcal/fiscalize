myApp.controller('ChatController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache, Fiscalizados, Convenios)  {

		$scope.messages = [{
                id: '535d625f898df4e80e2a125e',
                text: 'Quem é o responsável por esse convênio?',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: '1455110273886'
            }];


        $scope.you = {
            userId: myCache.get('uuid'),
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif'
        };

        $scope.sendMessage = function(message) {
            console.log('sendMessage');
        };

});
