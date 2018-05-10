const db = require('./db');

const DEFAULT_OFFER_IMAGE = "/images/offers/default.png";

const sqlGetByUserId = "SELECT path, offerId FROM Image, Offer, User WHERE User.id = Offer.userId AND Image.offerId = Offer.id AND User.id = ?;";
const sqlGetFirstByOfferId = "SELECT path FROM Image WHERE offerId = ? LIMIT 1;";
const sqlGetByOfferId = "SELECT path FROM Image WHERE offerId = ?;";


function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

function getFirstByOfferId(offerId) {
    return db.sqlQuery(sqlGetFirstByOfferId, [offerId]);
}

function getByOfferId(id) {
    return db.sqlQuery(sqlGetByOfferId, [id]);
}

module.exports.DEFAULT_OFFER_IMAGE = DEFAULT_OFFER_IMAGE;
module.exports.getByUserId = getByUserId;
module.exports.getFirstByOfferId = getFirstByOfferId;
module.exports.getByOfferId = getByOfferId;
