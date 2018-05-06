var express = require('express');
var router = express.Router();
var userModel = require('../models/search');

router.get('/', function(req, res, next) {
  var Search = req.query.searchText;
  var Site = "localhost:3000"
  var Maison = [];
  Maison.Data = [[[11,"Maison1",100,1],[22,"Maison2",200,2],[33,"Maison3",300,3]],
                [[44,"Maison4",400,4],[55,"Maison5",500,5],[66,"Maison6",600,6]],
                [[77,"Maison7",700,7],[88,"Maison8",800,8],[99,"Maison9",900,9]],
                [[1010,"Maison10",1000,10]]];
  if (Maison.Data[0][0] === null)   // En attente Nombre MySQL
    Maison.Lenght = 0;              //
  else Maison.Lenght = 1;           //
  var Result = [];
  Result.Data = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  Result.Lenght = Result.Data.length;
  res.render('search', {
    title: 'Recherche',
    Site: Site,
    Search: Search,
    Result: Result,
    Maison: Maison
  });
  next();
});

module.exports = router;
