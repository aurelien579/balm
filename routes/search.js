var express = require('express');
var router = express.Router();
var searchModel = require('../models/search');

router.get('/', function(req, res, next) {
  var search = [];
  search.text = req.query.searchText; // Récupère le texte de recherche
  search.datedep = req.query.datedep;
  search.datearr = req.query.datearr;
  search.numberpers = req.query.numberpers;
  search.pool = req.query.pool;
  search.garden = req.query.garden;
  search.city = req.query.city;

  searchModel.getByOffer(search)
    .then((results) => {

      var _page = [];
      _page.size = 3;
      _page.count = Math.ceil(results.length / _page.size);
      _page.current = parseInt(req.query.page);
      if (!_page.current)
        _page.current = 1;
      _page.inf = _page.current - 1;
      _page.sup = _page.current + 1;

      var url = []
      url.current = req.url.substring(1);
      url.base = url.current.replace("&page=" + _page.current,"");

      if ((_page.current == _page.count) && ((results.length % _page.size) > 0))
        _page.rst = results.length % _page.size;
      else _page.rst = _page.size;

      var result = [];
      for (var i = 0; i < _page.rst; i++) {
        result[i] = results[i + ((_page.current - 1) * _page.size)];
      }
      console.log(result);

      var house = [];
      house.total_lgt = results.length;
      house.lgt = result.length;
      house.data = [];

      // Passe d'un tableau 1D à tableau 2D
      for (var i = 0; i < house.lgt; i += 3) {
        house.data[i / 3] = [];
        for (var j = 0; j < 3; j++) {
          if ((i + j) < house.lgt) {
            house.data[i / 3][j] = result[i + j];
          }
        }
      }
      res.render('search', {
        title: 'Recherche : '+search.text,
        search: search,
        house: house,
        url: url,
        page: _page
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
