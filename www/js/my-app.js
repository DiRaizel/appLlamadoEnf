//
var app = new Framework7({
    // App root element
    root: '#appLlamadoEnf',
    // App Name
    name: 'llamadoEnf',
    // App id
    id: 'com.llamadoEnf',
    // Enable swipe panel
    panel: {
        swipe: 'left'
    },
    // Add default routes
    routes: [
        {
            path: '/home/',
            url: 'index.html'
        }
    ],
    // ... other parameters
});

//
var $$ = Dom7;

//
var mainView = app.views.create('.view-main');

//
var arrayU = [];

//
document.addEventListener('deviceready', function () {
    //
    if (localStorage.dir === undefined) {
        //
        app.dialog.prompt('', 'Dirección?', function (dir) {
            //
            localStorage.dir = dir;
            $$('#direccion').html(dir);
        });
    } else {
        //
        $$('#direccion').html(localStorage.dir);
    }
    //
    cordova.plugins.CordovaMqTTPlugin.connect({
        url: 'tcp://165.227.89.32', //a public broker used for testing purposes only. Try using a self hosted broker for production.
        port: '1883',
        clientId: 'com.llamadoEnf',
        willTopicConfig: {
            qos: 0, //default is 0
            retain: false, //default is true
            topic: "appLlamadoEnf/prueba",
            payload: ""
        },
        username: "fabian",
        password: '1234',
        success: function (s) {
//            alert('conectado');
        },
        error: function (e) {
//            alert('error al conectar');
        },
        onConnectionLost: function (e) {
//            alert('desconectado');
        }
    });
});

//
function editarDireccion() {
    //
    app.dialog.prompt('', 'Dirección', function (dir) {
        //
        localStorage.dir = dir;
        $$('#direccion').html(dir);
    });
}

//
function llamado() {
    //
    cordova.plugins.CordovaMqTTPlugin.publish({
        topic: 'appLlamadoEnf/prueba',
        payload: localStorage.dir,
        qos: 0,
        retain: false,
        success: function (s) {
            //
            alert('Solicitud enviada!');
            //
            $$('#btnLlamado').addClass('disabled');
            $$('#btnLlamado').addClass('color-gray');
            tiempo();
        },
        error: function (e) {
            //alert("err!! something is wrong. check the console")
        }
    });
}

//
function tiempo() {
    //
    var controlColorDivT = 0;
    //
    var intervaloC = setInterval(function () {
        //
        controlColorDivT++;
        //
        $$('#tiempo').html(60 - controlColorDivT);
        //
        if (controlColorDivT >= 60) {
            //
            $$('#btnLlamado').removeClass('disabled');
            $$('#btnLlamado').removeClass('color-gray');
            $$('#tiempo').html('');
            //
            clearInterval(intervaloC);
        }
    }, 1000);
}