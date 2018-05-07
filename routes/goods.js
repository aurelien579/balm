const express = require('express');
const router = express.Router();
const goodsModel = require('../models/goods');
const commentModel = require('../models/comment');
const app = require('../app');

// req -> recuperer les informations que le client m'envoi
// res -> reponse a envoyer au client


router.get('/', function(req, res, next) {
//  var sea = req.params.searchText;
  console.log(req.body.searchText);
  res.render('goods', {title: 'goods' });
  next();
});



router.get('/:id', function(req, res, next) {
//  var sea = req.params.searchText;
  var Description;
  var id = req.params.id;
  var Titre;
  var Lieux;

  goodsModel.getById(id, (err, offer) => {
    commentModel.getById(id, (err, comments)=>{

      if (err) {
        res.render('goods', {err:err});
      } else {
        res.render('goods', {
          offer: offer,
          comments: comments
        });
      }
    });
  });

});

module.exports = router;
