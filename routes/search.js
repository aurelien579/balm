var express = require('express');
var router = express.Router();
//var userModel = require('../models/search');

// req -> recuperer les informations que le client m'envoi
// res -> reponse a envoyer au client

router.get('/', function(req, res, next) {
  var Search = req.query.searchText;
  var Maison = [];
  Maison.Data = [[["Maison1",100,1],["Maison2",200,2],["Maison3",300,3]],[["Maison4",400,4],["Maison5",500,5],["Maison6",600,6]],[["Maison7",700,7],["Maison8",800,8],["Maison9",900,9]],[["Maison10",1000,10]]];
  if (Maison.Data[0][0] === null)   // En attente Nombre MySQL
    Maison.Lenght = 0;              //
  else Maison.Lenght = 1;           //
  var Result = [];
  Result.Data = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  Result.Lenght = Result.Data.length;
  res.render('search', {
    title: 'Recherche',
    Search: Search,
    Result: Result,
    Maison: Maison
  });
  next();
});

module.exports = router;
