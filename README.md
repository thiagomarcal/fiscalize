# Fiscalize!

  O Fiscalize! foi criado a partir das seguintes tecnologias: Phonegap, Cordova, AngularJS, MongoDB e RestHeart

Apresentação do Projeto:  https://drive.google.com/file/d/0BwTX39fPd3faRXBSUWIxNjRXTkk/view?usp=sharing

Vídeo do Projeto: https://www.youtube.com/watch?v=-fehb_-knLw

Aplicação WEB (em construção): http://fiscalize.org

## Equipe

    Thiago Marçal - thiagormarcal@gmail.com
    Leonardo Miccolis  - leomiccolis@gmail.com
    Paulo Henrique - paulohsa32@gmail.com

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