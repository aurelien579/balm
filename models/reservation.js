const db = require('./db');

const WAITING = 0;
const ACCEPTED = 1;
const REJECTED = 2;
const sqlAccept = 'UPDATE Reservation SET status = 1 WHERE id = ?;';
const sqlReject = 'UPDATE Reservation SET status = 2 WHERE id = ?;';
const sqlGetStatus = 'SELECT status FROM Reservation WHERE id = ?;';

const sqlGetByUserId = `
SELECT
    DATE_FORMAT(Reservation.from, '%d %M %Y') AS 'from',
    DATE_FORMAT(Reservation.to, '%d %M %Y') AS 'to',
    Reservation.status,
    Reservation.offerId,
    Offer.title,
    Offer.price,
    COALESCE(Image.path, '/images/offers/default.jpg') AS path
FROM
    Reservation,
    Offer
        LEFT JOIN
    Image ON Image.id = (SELECT
            id
        FROM
            Image
        WHERE
            Image.offerId = Offer.id
        ORDER BY id
        LIMIT 1)
WHERE
    Reservation.userId = ?
        AND Offer.id = Reservation.offerId;
`;

const sqlGetDemandsTo = `
SELECT
    Reservation.id AS reservationId,
    DATE_FORMAT(Reservation.from, '%d %M %Y') AS 'from',
    DATE_FORMAT(Reservation.to, '%d %M %Y') AS 'to',
    User.firstName,
    Reservation.status,
    Reservation.userId,
    Offer.id AS offerId,
    Offer.title,
    Offer.description,
    Offer.price,
    COALESCE(Image.path, '/images/offers/default.jpg') AS path
FROM
    User,
    Reservation,
    Offer
        LEFT JOIN
    Image ON Image.id = (SELECT
            id
        FROM
            Image
        WHERE
            Image.offerId = Offer.id
        ORDER BY id
        LIMIT 1)
WHERE
    Reservation.offerId = Offer.id
        AND Reservation.userId = User.id
        AND Offer.userId = ?;
`;

const sqlAddReservation = `INSERT INTO Reservation(offerId, userId, \`from\`, \`to\`,\`status\`) VALUES(?, ?, ?, ?, ?); `;


function createReservation(offerId, userId, from, to, status) {
    return db.sqlQuery(sqlAddReservation, [offerId, userId, from, to, status]);
}

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

function getDemandsTo(userId) {
    return db.sqlQuery(sqlGetDemandsTo, [userId]);
}

function accept(reservationId) {
    return db.sqlQuery(sqlAccept, [reservationId]);
}

function reject(reservationId) {
    return db.sqlQuery(sqlReject, [reservationId]);
}

function getStatus(reservationId) {
    return db.sqlQuery(sqlGetStatus, [reservationId]);
}

exports.getByUserId = getByUserId;
exports.createReservation = createReservation;
exports.getDemandsTo = getDemandsTo;
exports.accept = accept;
exports.reject = reject;
exports.getStatus = getStatus;

exports.WAITING = WAITING;
exports.ACCEPTED = ACCEPTED;
exports.REJECTED = REJECTED;
