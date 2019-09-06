// Required Modules
require('dotenv').config()
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');

const app = express();

// Middleware and config
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.set(express.json()); //Adds ability to send json 
app.use(layouts);
app.use(helmet());

// Configure the express-session middleware
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 30 * 60 * 1000
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))


// Use this line once to set up the store table
// sessionStore.sync();
app.use(passport.initialize());
app.use(passport.session()); // Add user token to session

// Add currentUser to locals
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/api', require('./controllers/api'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
})

// Listen!
// NOTE - make sure ppConfig and Github's app registration page all point to the same port
app.listen(process.env.PORT || 3000, () => {
    console.log('Server now listening on port:', process.env.PORT || 3000);
})