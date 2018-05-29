const express = require('express');
const router = express.Router();
const app = require('../app');


router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'about.html'
    });
    next();
});

module.exports = router;
