const passport = require('passport');
const passportGoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const environment = require('./environment');


passport.use(new passportGoogleStrategy({
    clientID: environment.google_client_ID,
    clientSecret: environment.google_client_Secret,
    callbackURL: environment.google_callback_URL
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}, function(err, user){
        if(err){
            console.log('Error', err);
            return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);
        if(user){
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log('Error', err);
                    return;
                }
                return done(null, user);
            });
        }
    });
}));

module.exports = passport;