var express = require('express');
var router = express.Router();
var searchCity = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'BALM'
    });
});

router.get('/autocomplete', function(req, res, next) {
  searchCity.getCitiesName(req.query.query)
    .then((results) => {
      res.send(JSON.stringify(results));
    })
    .catch((err) => {
      console.log(err);
      if (err) {  // Voir results undefined
        res.render('error', {
          error: err
        });
      }
    })
});

module.exports = router;
