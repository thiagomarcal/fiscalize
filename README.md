# Fiscalize!


> O Fiscalize! foi criado a partir das seguintes tecnologias:
Phonegap, Cordova, AngularJS, MongoDB e RestHeart

## Instalação PhoneGap

### Requerimentos
node.js - JavaScript runtime para rodar código JavaScript
Download em: https://nodejs.org/en/

Use o npm para instalar o Phonegap.

    $ npm install -g phonegap

## Projeto

### Faça o Clone do repositório

    $ cd ~/<diretorio>
    $ git clone https://crunkbr@bitbucket.org/crunkbr/hackathon.git
    $ cd ~/<diretorio>/hackathon

### Build do Projeto

Dentro da pasta do projeto faça um build para a plataforma desejada (iOS, Android, WindowsPhone, Browser, entre outras)

    Android:
    $ phonegap build android

    IOS:
    $ phonegap build ios

    Browser:
    $ phonegap build browser

### Executar Projeto

Certifique-se que o device esteja devidamente conectado no computador via USB

    Android:
    $ phonegap run android

    IOS:
    $ phonegap run ios

    Browser:
    $ phonegap run browser


Após esse comando o aplicativo começará a execução no device conectado.

### Lista dos Serviços disponibilizados por nossa Api Rest (RestHeart) 

Caso queira aprofundar-se nos parâmetros de pesquisa visite a página http://restheart.org/

Lista de Convênios
http://74.124.24.115:8080/hackathon/ConveniosProgramasFTS

Detalhe Convênio
http://74.124.24.115:8080/hackathon/detalhe/<NR_CONVENIO>

Lista de Fiscalizados
http://74.124.24.115:8080/hackathon/Fiscalizados

Lista de Estados
http://74.124.24.115:8080/hackathon/Estados

Lista de Municípios
http://74.124.24.115:8080/hackathon/Municipios

Lista de Situação Convênio
http://74.124.24.115:8080/hackathon/SituacaoConvenio