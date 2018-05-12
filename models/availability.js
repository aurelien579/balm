const db = require('./db');

const sqlAdd = "INSERT INTO Availability (offerId, start, end) VALUES (?, ?, ?)";

function add(offerId, from, to) {
    return db.sqlQuery(sqlAdd, [offerId, from, to]);
}


const sqlGetAvailabilityByOfferId = "SELECT * FROM Availability WHERE offerId = ?;";

function getAvailabilityByOfferId(offerId) {
    return db.sqlQuery(sqlGetAvailabilityByOfferId, [offerId]);
}

exports.add = add;
exports.getAvailabilityByOfferId = getAvailabilityByOfferId;
