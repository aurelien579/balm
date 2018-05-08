var express = require('express');
var router = express.Router();
var searchModel = require('../models/search');

router.get('/', function(req, res, next) {
  var search = req.query.searchText; // Récupère le texte de recherche
  var search_class;

  searchModel.getByFindRegion(search, (err, result) => {
    if (result == 0) {
      searchModel.getByFindDepartment(search, (err, result) => {
        if (result == 0) {
          searchModel.getByFindCity(search, (err, result) => {
            if (result == 0) {
              searchModel.getByFindPostCode(search, (err, result) => {
                if (result == 0)
                  search_class = 0;
                else search_class = 4;
              });
            } else search_class = 3;
          });
        } else search_class = 2;
      });
    } else search_class = 1;
  })

  searchModel.getByOffer(search, search_class, (err, results) => {
    if (err) {
      res.render('error', {
        error: err
      });
    }
    var house = [];
    var house_lgt = results.length;
    // Passe d'un tableau 1D à tableau 2D
    for (var i = 0; i < results.length; i += 3) {
      house[i / 3] = [];
      for (var j = 0; j < 3; j++) {
        if ((i + j) < results.length) {
          house[i / 3][j] = results[i + j];
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
