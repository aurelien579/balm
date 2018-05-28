const db = require('./db');
const availabilityModel = require('./availability');
const imageModel = require('./image');

const RENTING = 0; /* Location */
const EXCHANGE = 1; /* Echange */
const HOSTING = 2; /* Hébergement */

const sqlGetById = 'SELECT * FROM Offer WHERE id = ?;';
const sqlGetUserId = 'SELECT Offer.userId FROM Offer WHERE id = ?;';
const sqlGetByUserId = 'SELECT * FROM Offer WHERE userId = ?;';

const sqlDelete = 'DELETE FROM Offer WHERE id = ?;';
const sqlDeleteRes = 'DELETE FROM Reservation WHERE offerid = ?;';
const sqlDeleteImg = 'DELETE FROM Image WHERE offerId = ?;';
const sqlDeleteCom = 'DELETE FROM Comment WHERE idOffer = ?;';
const sqlDeleteDisp = 'DELETE FROM Availability WHERE offerId = ?;';

const slqGetByUserIdWithFirstImage =
    `SELECT Offer.id, Offer.title, Offer.description, Offer.price, Offer.type, COALESCE(Image.path, '/images/offers/default.jpg') AS path
    FROM Offer LEFT JOIN Image ON Image.id =
    (
    	SELECT id FROM Image
    	WHERE Image.offerId = Offer.id
    	ORDER BY id
    	LIMIT 1
    ) WHERE Offer.userId = ?;`;

const sqlCreate =
    `INSERT INTO Offer
        (userId, title, description, price, region, department, city, postcode, address, nbpeople, pool, garden, citycenter, type)
     VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

const sqlEdit = `UPDATE Offer SET title = ?, description = ?, price = ?, nbpeople = ?, type = ? WHERE id = ?;`

function getById(id) {
    return db.sqlQuery(sqlGetById, [id]);
}

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

function getByUserIdWithFirstImage(userId) {
    return db.sqlQuery(slqGetByUserIdWithFirstImage, [userId]);
}

function create(userId, title, description, price, region, department, city, postcode, address, nbpeople, pool, garden, citycenter, offerType) {
    return db.sqlQuery(sqlCreate, [userId, title, description, price, region, department, city, postcode, address, nbpeople, pool, garden, citycenter, offerType]);
}

function getUserId(offerId) {
    return db.sqlQuery(sqlGetUserId, [offerId]);
}

async function deleteOffer(offerId) {
    await db.sqlQuery(sqlDeleteRes, [offerId]);
    await db.sqlQuery(sqlDeleteDisp, [offerId]);
    await db.sqlQuery(sqlDeleteImg, [offerId]);
    await db.sqlQuery(sqlDeleteCom, [offerId]);

    return await db.sqlQuery(sqlDelete, [offerId]);
}

function edit(offerId, title, description, price, nbpeople) {
    return db.sqlQuery(sqlEdit, [title, description, price, nbpeople, offerId]);
}

async function getFullWithDefault(offerId) {
    let offer = (await getById(offerId))[0];
    offer.images = await imageModel.getByOfferId(offer.id);

    for (let i = 0; i < 3; i++) {
        if (typeof offer.images[i] == 'undefined') {
            offer.images[i] = {
                id: -i - 1,
                path: '/images/icon-add.png'
            };
        }
    }

    offer.avail = await availabilityModel.getAvailabilityByOfferId(offer.id);

    if (offer.avail.length == 0) {
        offer.avail = [{
            start: Date.now().toString(),
            end: Date.now().toString()
        }];
    }

    return offer;
}

exports.edit = edit;
exports.getUserId = getUserId;
exports.deleteOffer = deleteOffer;
exports.getByUserId = getByUserId;
exports.getById = getById;
exports.getByUserIdWithFirstImage = getByUserIdWithFirstImage;
exports.create = create;
exports.getFullWithDefault = getFullWithDefault;

exports.RENTING = RENTING;
exports.EXCHANGE = EXCHANGE;
exports.HOSTING = HOSTING;