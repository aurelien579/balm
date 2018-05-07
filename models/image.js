const pool = require('./db').pool;

let sqlGetByUserId = "SELECT path, offerId FROM Image, Offer, User WHERE User.id = Offer.userId AND Image.offerId = Offer.id WHERE User.id = ?;";

var getByUserId = function(userId, callback) {
    pool.query(sqlGetByUserId, userId, callback);
}

module.exports.getByUserId = getByUserId;