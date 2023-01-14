const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, function(req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding User --> Passport.js', err);
                req.flash('error', err);                
                return done(err, false);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding User --> Passport.js', err);
            return done(err, false);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;