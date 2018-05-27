var express = require('express');
var router = express.Router();
var search = require('../models/autocomplete');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'BALM'
    });
});

router.get('/autocomplete', function(req, res, next) {
  try {
    if (req.query.name == "city" | req.query.name == "searchText") {
      search.getCitiesName(req.query.query)
        .then((results) => {
          res.send(JSON.stringify(results));
        })
    } else if (req.query.name == "department") {
      search.getDepartementsName(req.query.query)
        .then((results) => {
          res.send(JSON.stringify(results));
        })
    } else if (req.query.name == "region") {
      search.getRegionsName(req.query.query)
        .then((results) => {
          res.send(JSON.stringify(results));
        })
    }
  } catch (err) {
      console.log(err);
      if (err) {  // Voir results undefined
        res.render('error', {
          error: err
        });
      }
    }
});

module.exports = router;
