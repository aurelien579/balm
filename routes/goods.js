const express = require('express');
const router = express.Router();
const goodsModel = require('../models/goods');
const commentModel = require('../models/comment');
const imageModel = require('../models/image');
const app = require('../app');
const utils = require('./utils');

// req -> recuperer les informations que le client m'envoi
// res -> reponse a envoyer au client


router.get('/', function(req, res, next) {
    //  var sea = req.params.searchText;
    console.log(req.body.searchText);
    res.render('goods', {
        title: 'goods'
    });
    next();
});

router.get('/new', utils.mustBeConnected, function(req, res, next) {
    res.render('goods-new');
});

router.get('/:id', function(req, res, next) {
    //  var sea = req.params.searchText;
    var id = req.params.id;
    let offer;
    let comments;

    goodsModel.getById(id)
        .then((_offers) => {
            offer = _offers[0];
            return commentModel.getByOfferId(id);
        })
        .then((_comments) => {
            comments = _comments;
            return imageModel.getByOfferId(id);
        })
        .then((images) => {
            res.render('goods', {
                offer: offer,
                comments: comments,
                images: images
            });
        })
        .catch((err) => {
            res.render('error', {
                error: err
            });
        });

});

module.exports = router;