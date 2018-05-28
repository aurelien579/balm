const express = require('express');
const router = express.Router();
const commentModel = require('../models/comment')

router.post('/', async function(req, res, next) {
    await commentModel.create(req.body.offerId, req.session.user.id,
        req.body.rating, req.body.content);

    res.status(200).send();
});

module.exports = router;