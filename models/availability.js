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

function getByOfferIdContaining(offerId, start, end) {
    return db.sqlQuery('SELECT * FROM Balm.Availability WHERE offerId = ? AND start <= ? AND end >= ?;', [offerId, start, end]);
}

function update(id, start, end) {
    return db.sqlQuery('UPDATE Availability SET start = ?, end = ? WHERE id = ?', [start, end, id]);
}

async function setUnavailable(offerId, start, end) {
    /*  Update the availability interval (working) */
    /* TODO: Error handling (ie. if no availability found) */

    let availability = (await getByOfferIdContaining(offerId, start, end))[0];
    availability.start = new Date(availability.start);
    availability.end = new Date(availability.end);

    if (start - availability.start == 0) {
        update(availability.id, end, availability.end);
    } else if (end - availability.end == 0) {
        update(availability.id, availability.start, start);
    } else {
        update(availability.id, availability.start, start);
        add(offerId, end, availability.end);
    }
}

exports.add = add;
exports.getAvailabilityByOfferId = getAvailabilityByOfferId;
exports.getByOfferIdFormatted = getByOfferIdFormatted;
exports.setUnavailable = setUnavailable;