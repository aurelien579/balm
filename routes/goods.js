const express = require('express');
const router = express.Router();
const goodsModel = require('../models/goods');
const commentModel = require('../models/comment');
const imageModel = require('../models/image');
const locationModel = require('../models/location');
const availabilityModel = require('../models/availability');
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

router.get('/new', utils.mustBeConnected, async function(req, res, next) {
    res.render('goods-new');
});

router.post('/new', utils.mustBeConnected, async function(req, res, next) {
    if (!(await locationModel.cityExists(req.body.city))) {
        res.render('goods-new', {
            errorMessage: "Cette ville n'existe pas"
        });
    }

    if (!(await locationModel.departmentExists(req.body.department))) {
        res.render('goods-new', {
            errorMessage: "Ce département n'existe pas"
        });
    }

    goodsModel.create(req.session.user.id,
            req.body.title,
            req.body.description,
            req.body.price,
            req.body.department,
            req.body.city,
            req.body.postcode,
            req.body.address)
        .then((result) => {
            let i = 1;
            for (let property in req.files) {
                if (req.files.hasOwnProperty(property)) {
                    let file = req.files[property];

                    let path = "public/images/offers/" + result.insertId + "-" + i + "." + file.name.split('.').pop();
                    imageModel.add(result.insertId, path);
                    file.mv(path, function(err) {
                        console.log("Move error: ", err);
                    });
                }
                i++;
            }

            return availabilityModel.add(result.insertId, req.body.from, req.body.to);
        })
        .then((result) => {
            res.render('goods-new', {
                successMessage: "Votre annonce a bien été déposé"
            });
        })
        .catch((err) => {
            console.log(err);
            res.render('goods-new', {
                errorMessage: 'Il existe déjà une annonce avec ce titre'
            })
        });
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
