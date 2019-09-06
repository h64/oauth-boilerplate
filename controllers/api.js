const router = require('express').Router();
const db = require('../models');
const axios = require('axios');

router.get('/repos', (req, res) => {
    // console.log(req.user.accessToken);
    let config = {
        // NOTE - Set User-Agent to whatever your github's app name is 
        headers: {
            'Authorization': `Bearer: ${req.user.accessToken}`,
            'User-Agent': 'henry-oauth-boilerplate'
        }
    }
    // console.log(config);
    axios.get('https://api.github.com/users/repos', config)
        .then(response => {
            // console.log(response.data);
            res.json(response.data);
            // res.render('repos', { repos: response.data })
        })
        .catch(err => {
            console.log(err);
            res.send('An error occurred');
        })
})

module.exports = router;