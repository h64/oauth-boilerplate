const router = require('express').Router();
const passport = require('../config/ppConfig');
const db = require('../models');

// Displays the Github login form
router.get('/github', passport.authenticate('github'));

// 
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/github' }),
    (req, res) => {
        // Successful authentication, redirect home.
        console.log('This is the user:', req.user)
        res.redirect('/');
    });

module.exports = router;