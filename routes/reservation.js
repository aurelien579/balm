const express = require('express');
const router = express.Router();
const goodsModel = require('../models/goods');
const commentModel = require('../models/comment');
const imageModel = require('../models/image');
const locationModel = require('../models/location');
const availabilityModel = require('../models/availability');
const reservationModel = require('../models/reservation');
const app = require('../app');
const utils = require('./utils');

router.get('/new', function(req, res, next) {
    let from = req.query.from; // Récupère le texte de recherche
    let to = req.query.to;
    let numberpers = req.query.numberpers;
    let id = req.query.id;
    let url: req.url;
    utils.mustBeConnectedToBook(req, res, next);

    reservationModel.createReservation(id, req.session.user.id, from, to, 0)
        .then((result) => {
            console.log(result);
            res.render('reservation', {
                successMessage: "Votre demande de reservation a bien été prise en compte",
                from: from,
                to: to,
                numberpers: numberpers,
                id: id
            });
        })
        .catch((err) => {
            console.log(err);
            res.render('reservation', {
                errorMessage: 'il manque des informations'
            });
        });
});

router.get('/:id/accept', utils.mustBeConnected, async function(req, res, next) {
    let id = req.params.id;
    //  let status = await reservationModel.getStatus(id);
});


module.exports = router;
