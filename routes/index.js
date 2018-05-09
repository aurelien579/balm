var express = require('express');
var router = express.Router();
var searchCity = require('../models/index');


/*router.post('/', function(req, res, next) {
  var starW = req.query.
  searchCity.getCitiesName(startW)
});*/
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'BALM'
    });
});

module.exports = router;
