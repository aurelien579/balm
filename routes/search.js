var express = require('express');
var router = express.Router();
var searchModel = require('../models/search');

router.get('/', function(req, res, next) {
  var search = [];
  search.text = req.query.searchText; // Récupère le texte de recherche
  search.datedep = req.query.datedep;
  search.datearr = req.query.datearr;
  search.numberpers = req.query.numberpers;
  search.pool = req.query.Pool;
  search.garden = req.query.Garden;
  search.city = req.query.City;

  searchModel.getByOffer(search)
    .then((results) => {
      var house = [];
      house.lgt = results.length;
      house.data = []
      // Passe d'un tableau 1D à tableau 2D
      for (var i = 0; i < house.lgt; i += 3) {
        house.data[i / 3] = [];
        for (var j = 0; j < 3; j++) {
          if ((i + j) < house.lgt) {
            house.data[i / 3][j] = results[i + j];
          }
        }
      }
      res.render('search', {
        title: 'Recherche',
        search: search,
        house: house
      });
    })
    .catch((err) => {
      if (err) {  // Voir results undefined
        res.render('error', {
          error: err
        });
      }
    })
});

module.exports = router;
