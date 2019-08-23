const passport = require('passport');
const passportGithub2 = require('passport-github2');
const GithubStrategy = passportGithub2.Strategy;
const db = require('../models');

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback'
},
function(accessToken, refreshToken, profile, cb) {
    db.user.findOrCreate({
        where: { githubId: profile.id }
    })
    .spread((user, created) => {
        console.log("Token:", accessToken);
        return cb(null, user); // next(err, user)
    })
}))

passport.serializeUser((user, cb) => {
    cb(null, user);
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

module.exports = passport;