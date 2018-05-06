const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
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
        console.log(user);
        createSession(req, user);

        if (user !== undefined) {
            var successMessage = "Vous êtes bien connecté";
        } else {
            var errorMessage = "Erreur lors de la connection";
        }

        res.render('login', {
            title: 'Connexion',
            successMessage: successMessage,
            errorMessage: errorMessage
        });
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
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
                errorMessage: errorMessage
            });
        } else {
            res.render('login', {
                title: 'Compte créé',
                successMessage: 'Votre compte a bien été créé'
            });
        }
    });
});

router.get('/logout', function(req, res, next) {
    clearSession(req);

    res.render('index', {
        title: 'BALM'
    });
});

module.exports = router;