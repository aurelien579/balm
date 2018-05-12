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


router.get('/new', utils.mustBeConnected, function(req, res, next) {
    from = req.query.from; // Récupère le texte de recherche
    to = req.query.to;
    numberpers = req.query.numberpers;
    id = req.query.id;

    reservationModel.createReservation(id, req.session.user.id, from, to, 0)
        .then((result) => {
            console.log(result);
            res.render('reservation', {
                successMessage: "Votre demande de reservation a bien été prise en compte"
            });
        })
        .catch((err) => {
            res.render('reservation', {
                errorMessage: 'il manque des informations'
            });
        });
});

router.get('/:id/accept', utils.mustBeConnected, async function(req, res, next) {
    let id = parseInt(req.params.id);
    let status = (await reservationModel.getStatus(id))[0].status;

    if (status == reservationModel.WAITING) {
        console.log("waiting");
        await reservationModel.accept(id);
    }

    res.redirect('/user');
});

router.get('/:id/reject', utils.mustBeConnected, async function(req, res, next) {
    let id = parseInt(req.params.id);
    let status = (await reservationModel.getStatus(id))[0].status;

    if (status == reservationModel.WAITING) {
        await reservationModel.reject(id);
    }

    res.redirect('/user');
});


module.exports = router;