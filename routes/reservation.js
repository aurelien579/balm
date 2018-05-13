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
    let from = req.query.from;
    let to = req.query.to;
    let numberpers = req.query.numberpers;
    let id = req.query.id;
    utils.mustBeConnectedToBook(req, res, next);

    reservationModel.createReservation(id, req.session.user.id, from, to, 0)
        .then((result) => {
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