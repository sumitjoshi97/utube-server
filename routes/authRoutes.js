const passport = require('passport');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'https://www.googleapis.com/auth/youtube.readonly'],
        accessType: 'offline'
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/');
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
}