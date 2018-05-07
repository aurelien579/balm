var express = require('express');
var router = express.Router();
var searchModel = require('../models/search');

router.get('/', function(req, res, next) {
  searchModel.getByOfferCity(req.query.searchText, (err, results) => {
    var search = req.query.searchText;  // Récupère le texte de recherche
    var house_lgt = results.length;
    // Passe d'un tableau 1D à tableau 2D
    var house = [];
    for(var i = 0; i < results.length; i += 3) {
      house[i/3] = [];
      for (var j = 0; j < 3; j++) {
        if ((i+j) < results.length) {
          //house[i/3][j] = [];
          house[i/3][j] = results[i+j];
        }
      }
    }

    res.render('search', {
      title: 'Recherche',
      search: search,
      house: house,
      house_lgt: house_lgt
    });
  });
});

module.exports = router;
