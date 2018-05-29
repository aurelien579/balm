const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const goodsModel = require('../models/goods');
const imageModel = require('../models/image');
const commentModel = require('../models/comment');
const reservationModel = require('../models/reservation');
const utils = require('./utils');

const app = require('../app');

function createSession(req, user) {
    req.session.user = user;
}

function clearSession(req) {
    req.session.user = undefined;
}

router.post('/login', async function(req, res, next) {
    userModel.getByUsername(req.body.email, async (err, user) => {
        let successMessage = '';
        let errorMessage = '';

        if (user !== undefined) {
            let match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                successMessage = "Vous êtes bien connecté";
                createSession(req, user);
                if (req.query.prev) {
                    return res.redirect(req.query.prev);
                }
            } else {
                errorMessage = "Mot de passe incorrect";
            }
        } else {
            errorMessage = "Erreur lors de la connection";
        }

        return res.render('user/login', {
            title: 'Connexion',
            successMessage: successMessage,
            errorMessage: errorMessage,
            prev: req.query.prev
        });
    });
});

router.get('/login', function(req, res, next) {
    userModel.getByUsername(req.body.email, (err, user) => {
        let successMessage = '';
        let errorMessage = '';

        res.render('user/login', {
            title: 'Connexion',
            prev: req.query.prev
        });

    });
});

router.post('/register', async function(req, res, next) {
    let hashed = await bcrypt.hash(req.body.password, 10);
    userModel.create(req.body.email, req.body.firstName, req.body.lastName, hashed, (err, user) => {
        if (err) {
            var errorMessage = err.message;
            if (err.code == userModel.USERNAME_EXISTS) {
                errorMessage = "Erreur lors de la création du compte, ce nom d'utilisateur est déjà pris";
            } else if (err.code == userModel.EMAIL_EXISTS) {
                errorMessage = "Erreur lors de la création du compte, cet email est déjà prise";
            }

            res.render('user/login', {
                title: 'Erreur',
                errorMessage: errorMessage
            });
        } else {
            res.render('user/login', {
                title: 'Compte créé',
                successMessage: 'Votre compte a bien été créé'
            });
        }
    });
});

router.get('/logout', utils.mustBeConnected, function(req, res, next) {
    clearSession(req);
    res.redirect('/');
});

router.get('/', utils.mustBeConnected, function(req, res, next) {
    console.log(req.body);
    res.render('user/user', {
        title: "Mon compte",
        user: req.session.user
    });
});

router.get('/infos', utils.mustBeConnected, function(req, res, next) {
    var modify = req.body.modify;
    console.log(modify);
    if (modify == 2) {
        console.log("Bien reçu");
        modify = 0;
    } else if (modify == undefined) {
        modify = 0;
    }
    res.render('user/user-infos', {
        modify: modify,
        user: req.session.user
    });
});

router.get('/offers', utils.mustBeConnected, function(req, res, next) {
    goodsModel.getByUserIdWithFirstImage(req.session.user.id)
        .then((offers) => {
            res.render('user/user-offers', {
                user: req.session.user,
                offers: offers
            });
        })
        .catch((err) => {
            res.render('error', {
                error: err
            });
        });
});

router.get('/comments', utils.mustBeConnected, function(req, res, next) {
    console.log("salut");
    commentModel.getByUserId(req.session.user.id)
        .then((comments) => {
            res.render('user/user-comments', {
                user: req.session.user,
                comments: comments
            })
        })
        .catch((err) => {
            res.render('error', {
                error: err
            });
        });
});

router.get('/reservations', utils.mustBeConnected, async function(req, res, next) {
    try {
        const results = await reservationModel.getByUserIdWithCommentCount(req.session.user.id);
        const now = new Date();

        results.forEach((reservation) => {
            let to = new Date(reservation.to2);
            if (to < now) {
                reservation.past = 1;
            }
        });

        res.render('user/user-reservations', {
            reservations: results
        });
    } catch (ex) {
        res.render('error', {
            error: ex
        });
    }
});

router.get('/demands', utils.mustBeConnected, function(req, res, next) {
    reservationModel.getDemandsTo(req.session.user.id)
        .then((results) => {
            res.render('user/user-demands', {
                demands: results
            });
        })
        .catch((err) => {
            res.render('error', {
                error: error
            });
        })
});

module.exports = router;
