const db = require('./db');

const DEFAULT_OFFER_IMAGE = "/images/offers/default.png";

const sqlGetByUserId = "SELECT path, offerId FROM Image, Offer, User WHERE User.id = Offer.userId AND Image.offerId = Offer.id AND User.id = ?;";
const sqlGetFirstByOfferId = "SELECT path FROM Image WHERE offerId = ? LIMIT 1;";
const sqlGetByOfferId = "SELECT path FROM Image WHERE offerId = ?;";


function getByUserId(userId, callback) {
    db.pool.query(sqlGetByUserId, userId, callback);
}

function getFirstByOfferId(offerId, callback) {
    return db.sqlQuery(sqlGetFirstByOfferId, [offerId]);
}

var getByOfferId = function(id, callback) {
    db.pool.query(sqlGetByOfferId, [id], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results);
        }
    });
}

module.exports.DEFAULT_OFFER_IMAGE = DEFAULT_OFFER_IMAGE;
module.exports.getByUserId = getByUserId;
module.exports.getFirstByOfferId = getFirstByOfferId;
module.exports.getByOfferId = getByOfferId;
