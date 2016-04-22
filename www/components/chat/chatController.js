myApp.controller('ChatController', function($scope, $timeout , $http, $location, $routeParams, requisicaoFactory,$cordovaDevice, myCache, Fiscalizados, Convenios, Chat)  {

        //Parametros
        $scope.params = $routeParams;


        $scope.getMessages = function () {
            Chat.getMessages(parseInt($scope.params.convenioId)).then(function(result) {
            mensagens = angular.fromJson(result.data._embedded["rh:doc"]);

                $scope.messages = [];

                angular.forEach(mensagens, function(value, key) {
                   
                    mensagem = {id: value._id.$oid,
                    text: value.texto,
                    userName: value.userName,
                    userId: value.uuid,
                    avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                    date: new Date(value.dataEnvio).getTime()};

                    $scope.messages.push(mensagem);
                });

            });
        }

        $scope.getMessages();

        $scope.you = {
            userId: myCache.get('uuid'),
            userName: 'Anônimo',
            avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif'
        };

        $scope.sendMessage = function(message) {
            $scope.mensagem = {};
            $scope.mensagem.convenio = parseInt($scope.params.convenioId);
            $scope.mensagem.uuid = myCache.get('uuid');
            $scope.mensagem.userName = 'Anônimo'
            $scope.mensagem.dataEnvio = new Date();
            $scope.mensagem.texto = message.text;

            Chat.sendMessage($scope.mensagem).then(function(result) {
                console.log('sendMessage');
                $scope.getMessages();
            });

        };
});
