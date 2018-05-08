const pool = require('./db').pool;

let sqlGetByUserId = "SELECT path, offerId FROM Image, Offer, User WHERE User.id = Offer.userId AND Image.offerId = Offer.id AND User.id = ?;";
let sqlGetByOfferId = "SELECT path FROM Image WHERE offerId = ?;";

var getByUserId = function(userId, callback) {
    pool.query(sqlGetByUserId, userId, callback);
}

var getByOfferId = function(offerId, callback) {
    pool.query(sqlGetByOfferId, [offerId], callback);
}

module.exports.getByUserId = getByUserId;
module.exports.getByOfferId = getByOfferId;