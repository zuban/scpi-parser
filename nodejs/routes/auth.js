var passport = require('passport');
var net = require('net');

module.exports = function (app) {

var HOST = '127.0.0.1';
var PORT = 5025;

var client = new net.Socket();


// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});


    app.get('/auth', function (req, res) {

        if (req.isAuthenticated()) {
            res.redirect('/');
            return;
        }

        res.render('auth', {
            error: req.flash('error')
        });
    });

     app.get('/getdata', function (req, res) {
     if (req.isAuthenticated()) {
            client.connect(PORT, HOST, function() {

             console.log('CONNECTED TO: ' + HOST + ':' + PORT);
             // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
             client.write('*ESE?');

            });
            res.json({ user: 'tobi' });
            return;
        }
            
            res.status(500).json({ error: 'message' });
    });

    app.get('/sign-out', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/auth', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true })
    );
}