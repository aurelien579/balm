const db = require('./db');

const DEFAULT_OFFER_IMAGE = "/images/offers/default.png";

const sqlGetByUserId = "SELECT path, offerId FROM Image, Offer, User WHERE User.id = Offer.userId AND Image.offerId = Offer.id AND User.id = ?;";
const sqlGetFirstByOfferId = "SELECT path FROM Image WHERE offerId = ? LIMIT 1;";

function getByUserId(userId, callback) {
    db.pool.query(sqlGetByUserId, userId, callback);
}

function getFirstByOfferId(offerId, callback) {
    return db.sqlQuery(sqlGetFirstByOfferId, [offerId]);
}

module.exports.DEFAULT_OFFER_IMAGE = DEFAULT_OFFER_IMAGE;
module.exports.getByUserId = getByUserId;
module.exports.getFirstByOfferId = getFirstByOfferId;