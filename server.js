// Required Modules
require('dotenv').config()
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');

const app = express();

// Middleware and config
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.set(express.json()); //Adds ability to send json 
app.use(layouts);

// Configure the express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session()); // Add user token to session

// Controllers
app.use('/auth', require('./controllers/auth'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

// Listen!
// NOTE - in production, make sure ppConfig and Github's app registration page
// all point to the same port
app.listen(process.env.PORT || 3000, () => {
    console.log('Server now listening on port:', process.env.PORT || 3000);
})