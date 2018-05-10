const db = require('./db');

const sqlGetByUserId = "SELECT * FROM Reservation, Offer WHERE Reservation.offerId == Offer.id AND userId = ?;";

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

exports.getByUserId = getByUserId;