const express = require('express');
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogleStrategy = require('./config/passport-google-oauth-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const nodemailer = require('nodemailer');
const environment = require('./config/environment');

const app = express();

const chatServer = require('http').createServer(app);
const chatSocket =  require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is working fine');

app.use(sassMiddleware({
    src: path.join(__dirname, environment.asset_path, 'scss'),
    dest: path.join(__dirname, environment.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static(environment.asset_path));
app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(cookieParser());

app.use(express.urlencoded());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'codeial',
    secret: environment.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }, 
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disable'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in listening', err);
        return;
    }
    console.log('Success');
});