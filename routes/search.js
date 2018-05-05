var express = require('express');
var router = express.Router();
//var userModel = require('../models/search');

// req -> recuperer les informations que le client m'envoi
// res -> reponse a envoyer au client

router.get('/', function(req, res, next) {
  var Search = req.query.searchText;
  var Result = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  res.render('search', {
    title: 'Recherche',
    Search: Search,
    NBResult: Result.length,
    Result: Result
  });
  console.log(req.params);
  next();
});

module.exports = router;
