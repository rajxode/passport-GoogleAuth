
// passport
const passport = require('passport');

// user model for storing the data
const User = require('../models/User');

// google strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// storing the user information in the session
passport.serializeUser(function(user, done){
    done(null, user.id);
})

// retrieving user information from the session
passport.deserializeUser(function(id, done){
    // find user
    const user = User.findById(id);
    
    // if no user found
    if (!user) {
        return done(new Error('User not found'));
    }
    
    // if found 
    done(null, user); // Retrieve the user based on the stored ID
    
})



// create new google strategy
passport.use(new GoogleStrategy({
        // this will be give us a token

        // credentials
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callback to open google consent screen for authentication
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    // getting user's data from the token provided by the google
    (accessToken, refreshToken, profile, next) => {
        // find if the user already exist inside the database
        User.findOne({email: profile._json.email})
        .then(user => {
            // if found
            if(user){
                // login user
                console.log('User exist', user);
                // calling next operation and saving user
                next(null,user)
            }
            // if user not found
            else{
                // create new user with email
                User.create({
                    // user's data by profile
                    name:profile.displayName,
                    googleId: profile.id,
                    email: profile._json.email
                }).then(user => {
                    // save user and call next opertion
                    console.log('new user', user);
                    next(null,user);
                })
                // if there is some error
                .catch(err => console.log(err));
            }
        })
    }
));