const passport = require('passport');

const router = require('express').Router();

// render the login page
router.get('/login', (req,res) => {
    res.render('login');
})

// render the login page
router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err) 
        }
        res.redirect('/auth/login');
    });
})


// route for google login
router.get(
    '/google', 
    // passport middleware to authenticate using google oauth2
    passport.authenticate('google',{
        // data that we are taking from google
        // user's email, and profile
        scope: ['profile','email'],
    }) , 
    // response
    (req,res) => {
        res.send('Google screen');
    }
)

// callback url
// render this screen after completing authentication
router.get('/google/callback',
    passport.authenticate('google',{ failureRedirect: '/auth/login' }),
    (req,res) => {
        res.send(req.user);
    }
)


module.exports = router;