const express = require('express');
const router = express.Router();
const goodsModel = require('../models/goods');
const commentModel = require('../models/comment');
const imageModel = require('../models/image');
const locationModel = require('../models/location');
const availabilityModel = require('../models/availability');
const app = require('../app');
const utils = require('./utils');
const reservationModel = require('../models/reservation');

const {
    check,
    validationResult
} = require('express-validator/check');
const {
    matchedData,
    sanitize
} = require('express-validator/filter');

// req -> recuperer les informations que le client m'envoi
// res -> reponse a envoyer au client

const goodsValidators = [
    check('city').exists()
    .custom(async (value) => {
        if (!(await locationModel.cityExists(value))) {
            throw new Error('Cette vile n\'existe pas');
        }
    }),
    check('department').exists()
    .custom(async (value) => {
        if (!(await locationModel.departmentExists(value))) {
            throw new Error('Ce département n\'existe pas');
        }
    }),
    check('title', 'Titre incorrect (il doit faire plus de 8 charactères)')
    .isLength({
        min: 8
    }),
    check('description', 'Description incorrecte (elle doit faire plus de 20 charactères)').isLength({
        min: 20
    }),
    check('from', 'Première disponibilité incorrecte (date de départ)').exists()
    .custom((from) => {
        return !isNaN(new Date(from));
    }),
    check('to', 'Première disponibilité incorrecte (date de fin)').exists()
    .custom((to) => {
        return !isNaN(new Date(to));
    }),
    check('price', 'Prix incorrect').isInt(),
    check('address', 'Adresse incorrecte')
    .isLength({
        min: 8
    }),
    check('postcode', 'Code postal incorrect').isInt()
]

router.get('/', function(req, res, next) {
    //  var sea = req.params.searchText;
    console.log(req.body.searchText);
    res.render('goods', {
        title: 'goods'
    });
    next();
});

router.get('/new', /*utils.mustBeConnected,*/ async function(req, res, next) {
    res.render('goods-new', {
        body: {}
    });
});

router.post('/new', utils.mustBeConnected, goodsValidators, async function(req, res, next) {
    const errors = validationResult(req);
    const mapped = errors.mapped();
    const from = new Date(req.body.from);
    const to = new Date(req.body.to);

    if (from > to || from < Date.now()) {
        mapped.dates = {
            msg: 'Les dates ne sont pas correctes'
        }
    }

    if (Object.keys(mapped).length > 0) {
        return res.render('goods-new', {
            errors: mapped,
            body: req.body
        });
    }

    if (req.body.pool === undefined) {
      req.body.pool = 0;
    }
    if (req.body.garden === undefined) {
      req.body.garden = 0;
    }
    if (req.body.citycenter === undefined) {
      req.body.citycenter = 0;
    }

    goodsModel.create(req.session.user.id,
            req.body.title,
            req.body.description,
            req.body.price,
            req.body.region,
            req.body.department,
            req.body.city,
            req.body.postcode,
            req.body.address,
            req.body.nbpeople,
            req.body.pool,
            req.body.garden,
            req.body.citycenter)
        .then((result) => {
            let i = 1;
            for (let property in req.files) {
                if (req.files.hasOwnProperty(property)) {
                    let file = req.files[property];
                    let path = "/images/offers/" + result.insertId + "-" + i + "." + file.name.split('.').pop();
                    let realPath = 'public' + path;

                    imageModel.add(result.insertId, path);
                    file.mv(realPath, function(err) {
                        console.log("Move error: ", err);
                    });
                }
                i++;
            }

            return availabilityModel.add(result.insertId, req.body.from, req.body.to);
        })
        .then((result) => {
            res.render('goods-new', {
                successMessage: "Votre annonce a bien été déposé",
                body: req.body
            });
        })
        .catch((err) => {
            res.render('goods-new', {
                errorMessage: 'Il existe déjà une annonce avec ce titre',
                body: req.body
            })
        });
});

router.get('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let offer = (await goodsModel.getById(id))[0];
        let comments = await commentModel.getByOfferId(id);
        let images = await imageModel.getByOfferId(id);
        let avail = await availabilityModel.getAvailabilityByOfferId(id);

        console.log(avail);

        res.render('goods', {
            offer: offer,
            comments: comments,
            images: images,
            id: id,
            avail: avail
        });
    } catch (ex) {
        res.render('error', {
            error: ex
        })
    }
});

router.get('/edit/:id', utils.mustBeConnected, async function(req, res, next) {
    try {
        const good = await goodsModel.getFullWithDefault(parseInt(req.params.id));
        if (good.userId != req.session.user.id)
            return res.render('hack');

        return res.render('goods-edit', {
            offer: good
        });
    } catch (ex) {
        return res.render('error', {
            error: ex
        })
    }
});

router.post('/edit/:id', utils.mustBeConnected, goodsValidators, async function(req, res, next) {
    try {
        const errors = validationResult(req);
        const mapped = errors.mapped();
        const from = new Date(req.body.from);
        const to = new Date(req.body.to);
        const offer = await goodsModel.getFullWithDefault(req.params.id);

        if (from > to || from < Date.now()) {
            mapped.dates = {
                msg: 'Les dates ne sont pas correctes'
            }
        }

        if (Object.keys(mapped).length > 0) {
            return res.render('goods-edit', {
                errors: mapped,
                offer: offer /* TODO: Vérifier si c'est necessaire */
            });
        }

        if (req.body.pool === undefined) {
          req.body.pool = 0;
        }
        if (req.body.garden === undefined) {
          req.body.garden = 0;
        }
        if (req.body.citycenter === undefined) {
          req.body.citycenter = 0;
        }

        await goodsModel.edit(req.params.id,
          req.body.title,
          req.body.description,
          req.body.price,
          req.body.region,
          req.body.department,
          req.body.city,
          req.body.postcode,
          req.body.address,
          req.body.nbpeople,
          req.body.pool,
          req.body.garden,
          req.body.citycenter);


        let i = 1;
        for (let name in req.files) {
            if (req.files.hasOwnProperty(name)) {
                let imageId = parseInt(name.replace('image', ''));
                let file = req.files[name];
                let path = "/images/offers/" + offer.id + "-" + imageId + "." + file.name.split('.').pop();
                let realPath = 'public' + path;

                imageModel.add(offer.id, path);

                file.mv(realPath, function(err) {
                    console.log("Move error: ", err);
                });
            }
            i++;
        }

        availabilityModel.update(offer.avail[0].id, from, to);

        res.render('user/user', {
            successMessage: "Votre annonce a bien été modifié",
            //body: req.body,
            //offer: offer
        });
    } catch (err) {
        console.log('ERROR: ', err);
        res.render('error', {
            message: 'Impossible de modifier l\'annonce',
            error: err
        });
    }
});

router.get('/delete/:id', utils.mustBeConnected, function(req, res, next) {
    goodsModel.getUserId(Number(req.params.id))
        .then((results) => {
            if (results[0].userId == req.session.user.id) {
                goodsModel.deleteOffer(Number(req.params.id))
                    .then((results) => {
                        return res.redirect('/user');
                    })
                    .catch((err) => {
                        return res.render('error', {
                            error: err
                        });
                    });
            } else {
                res.render('hack', {});
            }
        })
        .catch((err) => {
            return res.render('error', {
                error: err
            });
        });
});

module.exports = router;
