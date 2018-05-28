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

function getDate(date) {
    var jour = Date.getDate(date);
    var mois = Date.getMonth(date);
    var année = Date.getFullYear(date);
    console.log(datesql);
}



router.post('/new', utils.mustBeConnectedToBook, function(req, res, next) {
    let from = new Date(req.body.from);
    console.log(from);
    let to = new Date(req.body.to);
    let numberpers = req.body.numberpers;
    let id = req.body.id;
    reservationModel.createReservation(id, req.session.user.id, from, to, 0)
        .then((result) => {
            res.render('reservation', {
                successMessage: "Votre demande de reservation a bien été prise en compte",
                from: (from.toLocaleDateString('FR')),
                to: (to.toLocaleDateString('FR')),
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

router.get('/:id/accept', /*utils.mustBeConnected,*/ async function(req, res, next) {
    try {
        let id = parseInt(req.params.id);
        let reservation = (await reservationModel.get(id))[0];
        reservation.from = new Date(reservation.from);
        reservation.to = new Date(reservation.to);

        if (parseInt(reservation.status) == reservationModel.WAITING) {
            await reservationModel.accept(reservation.id);

            await availabilityModel.setUnavailable(
                reservation.offerId,
                reservation.from,
                reservation.to
            );

            await reservationModel.abortOverlapping(
                reservation.offerId,
                reservation.from,
                reservation.to
            );
        } else {
            res.render('error', {
                message: 'Invalid reservation status for accepting'
            });
        }

        res.redirect('/index');
    } catch (ex) {
        res.render('error', {
            error: ex
        });
    }
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
