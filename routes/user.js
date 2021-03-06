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

function createSession(req, res, user) {
    req.session.user = user;
    res.locals.session = {
        email: user.email
    }
}

function clearSession(req, res) {
    req.session.user = undefined;
    res.locals.session = undefined;
}

router.post('/login', async function(req, res, next) {
    userModel.getByUsername(req.body.email, async (err, user) => {
        let successMessage = '';
        let errorMessage = '';

        if (user !== undefined) {
            let match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                successMessage = "Vous êtes bien connecté";
                createSession(req, res, user);
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
    clearSession(req, res);
    res.redirect('/');
});

router.get('/', utils.mustBeConnected, function(req, res, next) {
    res.render('user/user', {
        title: "Mon compte",
        user: req.session.user
    });
});

router.get('/infos', utils.mustBeConnected, function(req, res, next) {
    res.render('user/user-infos', {
        user: req.session.user
    });
});

router.post('/infos', utils.mustBeConnected, async function(req, res, next) {
    try {
        await userModel.editUsername(req.body);
        userModel.getByUsername(req.body.email, (error, result) => {
            req.session.user = result;
            console.log('TESTTTTTTTTTTTTTTTTTTTT:', result);
            res.render('user/user-infos', {
                user: req.session.user
            });
        });

    } catch (error) {
        console.log("edit_info_F");
        res.render('error:', {
            error: error
        });
    }
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

router.get('/comments', utils.mustBeConnected, async function(req, res, next) {
    try {
        res.locals.comments = await commentModel.getByUserId(req.session.user.id);
        res.render('user/user-comments');
    } catch (error) {
        res.render('error', {
            error: error
        });
    }
});

router.get('/reservations', utils.mustBeConnected, async function(req, res, next) {
    try {
        const results = await reservationModel.getByUserIdWithCommentCount(req.session.user.id);

        res.render('user/user-reservations', {
            reservations: results
        });
    } catch (ex) {
        res.render('error', {
            error: ex
        });
    }
});

router.get('/demands', utils.mustBeConnected, async function(req, res, next) {
    try {
        res.locals.demands = await reservationModel.getDemandsTo(req.session.user.id);
        res.render('user/user-demands');
    } catch (error) {
        res.render('error', {
            error: error
        });
    }
});

module.exports = router;