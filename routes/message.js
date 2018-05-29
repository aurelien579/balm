const express = require('express');
const router = express.Router();
const utils = require('./utils');
const reservationModel = require('../models/reservation');
const messageModel = require('../models/message');

router.get('/', utils.mustBeConnected, async function(req, res, next) {
    try {
        res.locals.reservations = await reservationModel.getByUserId(req.session.user.id);
        res.render('messages');
    } catch (error) {
        res.render('error', {
            error: error
        });
    }
});

router.post('/', utils.mustBeConnected, async function(req, res, next) {
    try {
        await messageModel.create(req.body.reservationId,
            req.body.destUserId,
            req.body.sourceUserId,
            req.body.content);
        res.status(200)
        res.send('OK');
    } catch (error) {
        console.log(error);
        res.status(201).send('NOT OK');
    }
});

router.get('/:id', utils.mustBeConnected, async function(req, res, next) {
    try {
        const reservationId = req.params.id;

        res.locals.messages = await messageModel.getByReservationId(reservationId);
        res.locals.destinataire = (await reservationModel.getOwner(reservationId))[0];
        res.locals.source = (await reservationModel.getClient(reservationId))[0];
        res.locals.reservationId = reservationId;
        res.locals.myId = req.session.user.id;

        res.render('messages-list');
    } catch (error) {
        console.log(error);
        res.render('error', {
            error: error
        });
    }
});

module.exports = router;
