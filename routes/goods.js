var express = require('express');
var router = express.Router();
//var userModel = require('../models/search');

// req -> recuperer les informations que le client m'envoi
// res -> reponse a envoyer au client

router.get('/', function(req, res, next) {
//  var sea = req.params.searchText;
  console.log(req.body.searchText);
  res.render('goods', {title: 'goods' });
  next();
});

module.exports = router;
