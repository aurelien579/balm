const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const goodsModel = require('../models/goods');
const imageModel = require('../models/image');
const commentModel = require('../models/comment');
const reservationModel = require('../models/reservation');
const utils = require('./utils');

const app = require('../app');

function createSession(req, user) {
    req.session.user = user;
    app.locals.session = {
        email: user.email
    };
}

function clearSession(req) {
    req.session.user = undefined;
    app.locals.session = undefined;
}

router.post('/login', function(req, res, next) {
    userModel.getByUsername(req.body.email, (err, user) => {
        let successMessage = '';
        let errorMessage = '';

        if (user !== undefined) {
            if (user.password == req.body.password) {
                successMessage = "Vous êtes bien connecté";
                createSession(req, user);

                let backURL = req.header('Referer') || '/';
                res.redirect(backURL);
            } else {
                errorMessage = "Mot de passe incorrect";
            }
        } else {
            errorMessage = "Erreur lors de la connection";
        }

        res.render('user/login', {
            title: 'Connexion',
            successMessage: successMessage,
            errorMessage: errorMessage,

        });
    });
});

router.get('/login', function(req, res, next) {
    res.render('user/login', {
        title: 'Connexion'
    });
});

router.post('/register', function(req, res, next) {
    userModel.create(req.body.email, req.body.firstName, req.body.lastName, req.body.password, (err, user) => {
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
    res.render('user/user', {
        user: req.session.user
    });
});

router.get('/infos', utils.mustBeConnected, function(req, res, next) {
    res.render('user/user-infos', {
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

router.get('/reservations', utils.mustBeConnected, function(req, res, next) {
    reservationModel.getByUserId(req.session.user.id)
        .then((results) => {
            res.render('user/user-reservations', {
                reservations: results
            })
        })
        .catch((error) => {
            res.render('error', {
                error: error
            });
        });
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

router.get('/goods/delete/:id', utils.mustBeConnected, function(req, res, next) {
    goodsModel.deleteOffer(req.params.id)
        .then((results) => {
          res.render('user/user-offers', {
            user: req.session.user,
            offers: offers
          })
        })
        .catch((error) => {
            res.render('error', {
                error: error
            });
        });
});
module.exports = router;
