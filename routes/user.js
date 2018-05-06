var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.post('/login', function(req, res, next) {
    userModel.getByUsername(req.body.email, (err, user) => {
        req.session.user = user;

        if (user !== undefined) {
            var successMessage = "Vous êtes bien connecté";
        } else {
            var errorMessage = "Erreur lors de la connection";
        }

        res.render('login', {
            title: 'Connexion',
            user: req.session.user,
            successMessage: successMessage,
            errorMessage: errorMessage
        });
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        user: req.session.user,
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

            res.render('login', {
                title: 'Erreur',
                user: req.session.user,
                errorMessage: errorMessage
            });
        } else {
            res.render('login', {
                title: 'Compte créé',
                user: req.session.user,
                successMessage: 'Votre compte a bien été créé'
            });
        }
    });
});

router.get('/logout', function(req, res, next) {
    req.session.user = undefined;
    res.render('index', {
        title: 'BALM'
    });
});

module.exports = router;
