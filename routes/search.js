var express = require('express');
var router = express.Router();
//var userModel = require('../models/search');

// req -> recuperer les informations que le client m'envoi
// res -> reponse a envoyer au client

router.get('/', function(req, res, next) {
  res.render('search', {title: 'Recherche' });
  console.log(req.params);
  next();
});

module.exports = router;
