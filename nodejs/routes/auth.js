var passport = require('passport');

module.exports = function (app) {

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