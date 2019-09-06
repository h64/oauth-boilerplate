const router = require('express').Router();
const passport = require('../config/ppConfig');
const db = require('../models');

// Displays the Github login form
router.get('/github', passport.authenticate('github'));

// After logging in w/ github, authenticate
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/github' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(err => {
        console.log("logging out");
    })
    res.redirect('/');
})

module.exports = router;