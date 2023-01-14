const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const environment = require('./environment');

const User = require('../models/user');

let opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: environment.jwt_secret_key,
    passReqToCallback: true
}

passport.use(new JWTStrategy(opts, function(req, jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('Error', err);
            return done(err, false);
        }
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });

}));

module.exports = passport;