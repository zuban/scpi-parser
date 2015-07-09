var config = require("nconf");
var express = require('express');
var passport = require('passport');
var path = require('path');
var flash = require('connect-flash');
var http = require('http');
var net = require('net');



module.exports = function (app) {

    app.set('port', config.get("app:port") || 3000);
    app.set('views', path.join(__dirname + "/..", 'views'));
    app.set('view engine', 'jade');

    var sessionOptions = config.get("session");
    if ('production' == app.get('env')) {
        var MemcachedStore = require('connect-memcached')(express);
        sessionOptions.store = new MemcachedStore(config.get("memcached"));
    }

    //if behind a reverse proxy such as Varnish or Nginx
    //app.enable('trust proxy');
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname + "/..", 'public')));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session(sessionOptions));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);

    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    var server = http.createServer(app).listen(app.get('port'), function () {
    if ('development' == app.get('env')) {
        console.log('Express server listening on port ' + app.get('port'));
    }
    var io = require('socket.io')(server);

    app.set('io', io);
    console.log("init successful");


    var HOST = '127.0.0.1';
    var PORT = 5025;

    var client = new net.Socket();
    client.setTimeout(0);

    client.on('data', function(data) {
        io.emit('message',  String.fromCharCode.apply(null, new Uint16Array(data)));
        console.log('DATA: ' + data);    
    });
    // Add a 'close' event handler for the client socket
    client.on('close', function() {
        console.log('Connection closed');
        io.emit('disconnected', "disconnected");
        io.emit('restart', "true");
    });

    client.connect(PORT, HOST, function() {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        io.emit('connected', "connected");
    });

    client.on('error', function(e) {
    if(e.code == 'ECONNREFUSED') {
        console.log('Is the server running at ' + PORT + '?');

        client.setTimeout(4000, function() {
            client.connect(PORT, HOST, function(){
                console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                client.write('I am the inner superman');
            });
        });

        console.log('Timeout for 5 seconds before trying port:' + PORT + ' again');

    }   
});

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('message', function(msg){
                client.write(msg);
                console.log('message sent: ' + msg);
              });
                socket.on('restart', function(msg){
                client.connect(PORT, HOST, function() {
                    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                    io.emit('connected', "true");
                });
              });

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });

    });
};