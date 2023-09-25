
// env variables
require('dotenv').config();
// connect to database
require('./config/mongoose');
// express
const express = require('express');
// express session for storing the cookies session
const session = require('express-session');
// passport config
const passportConfig = require('./passport/passport');
// passport
const passport = require('passport');
// port
const {PORT} = process.env;
// auth routes
const auth = require('./routes/auth');

// creating app
const app = express();

// using ejs for rendering pages
app.set('view engine', 'ejs');

// Use express-session for session management
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (1 day in this example)
    secure: false, // Set this to false to allow the session over HTTP
  },
}));

// initialize passport
app.use(passport.initialize());
// passport sessions
app.use(passport.session());


// middleware to check whether user is logged in or not
const isLoggedIn = (req,res,next) => {
  // if user is not logged in 
  if(!req.user){
    // redirect to loggin page
    res.redirect('/auth/login');
  }
  // else
  // continue
  next();
}


// auth routes
app.use('/auth',auth);

// home route
// only for logged in user
app.get('/', isLoggedIn, (req,res) => {
    res.status(200).render('home');
})


// fire up the server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));