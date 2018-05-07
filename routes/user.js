const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const goodsModel = require('../models/goods');
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

function mustBeConnected(req, res, next) {
    if (!req.session.user) {
        console.log('Access violation!');
        res.redirect('/');
    } else {
        next();
    }
}

router.post('/login', function(req, res, next) {
    userModel.getByUsername(req.body.email, (err, user) => {
        createSession(req, user);

        if (user !== undefined) {
            var successMessage = "Vous êtes bien connecté";
        } else {
            var errorMessage = "Erreur lors de la connection";
        }

        res.render('user/login', {
            title: 'Connexion',
            successMessage: successMessage,
            errorMessage: errorMessage
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

router.get('/logout', mustBeConnected, function(req, res, next) {
    clearSession(req);
    res.redirect('/');
});

router.get('/', mustBeConnected, function(req, res, next) {
    res.render('user/user', {
        user: req.session.user
    });
});

router.get('/infos', mustBeConnected, function(req, res, next) {
    res.render('user/user-infos', {
        user: req.session.user
    });
});

router.get('/offers', mustBeConnected, function(req, res, next) {
    goodsModel.getByUserId(req.session.user.id, (err, results) => {
        if (err) {
            res.render('error', {
                error: err
            });
        } else {
            res.render('user/user-offers', {
                user: req.session.user,
                offers: results
            });
        }
    });
});

module.exports = router;