const db = require('./db');

const sqlGetFormatted = `
SELECT
    DATE_FORMAT(Availability.start, '%m-%d-%Y') AS 'start',
    DATE_FORMAT(Availability.end, '%m-%d-%Y') AS 'end'
FROM Availability WHERE offerId = ?;
`;

const sqlAdd = "INSERT INTO Availability (offerId, start, end) VALUES (?, ?, ?)";

function add(offerId, from, to) {
    return db.sqlQuery(sqlAdd, [offerId, from, to]);
}


const sqlGetAvailabilityByOfferId = "SELECT * FROM Availability WHERE offerId = ?;";

function getAvailabilityByOfferId(offerId) {
    return db.sqlQuery(sqlGetAvailabilityByOfferId, [offerId]);
}

function getByOfferIdFormatted(offerId) {
    return db.sqlQuery(sqlGetFormatted, [offerId]);
}

exports.add = add;
exports.getAvailabilityByOfferId = getAvailabilityByOfferId;
exports.getByOfferIdFormatted = getByOfferIdFormatted;
