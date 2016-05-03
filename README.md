# Fiscalize!

  O Fiscalize! foi criado a partir das seguintes tecnologias: Phonegap, Cordova, AngularJS, MongoDB e RestHeart

Equipe
Thiago Marçal - thiagormarcal@gmail.com
Leonardo Miccolis  - leomiccolis@gmail.com
Paulo Henrique - paulohsa32@gmail.com

  Apresentação do Projeto

  https://drive.google.com/file/d/0BwTX39fPd3faRXBSUWIxNjRXTkk/view?usp=sharing

  Video do Projeto

  https://www.youtube.com/watch?v=-fehb_-knLw

## Instalação PhoneGap

### Requerimentos

    Node.js - JavaScript runtime para rodar código JavaScript
      
      Download em: https://nodejs.org/en/

    Git - Repositório

      Download em: https://git-scm.com/

    Java SDK 8

      Download em: http://www.oracle.com/technetwork/java/javase/downloads/index.html

Use o npm para instalar o Phonegap.

    $ npm install -g phonegap

## Projeto

### Faça o Clone do repositório

    $ cd ~/<diretorio>
    $ git clone https://bitbucket.org/crunkbr/hackathon.git
    $ cd ~/<diretorio>/hackathon

### Build do Projeto

    Requerimento Android: Android SDK
    Download em: 
      Windows: http://dl.google.com/android/installer_r24.4.1-windows.exe
      MAC OS X: http://dl.google.com/android/android-sdk_r24.4.1-macosx.zip
      LINUX: http://dl.google.com/android/android-sdk_r24.4.1-linux.tgz

    Requerimento iOS: Xcode 
    Download em: 
      MAC OS X: https://developer.apple.com/xcode/download/
    

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