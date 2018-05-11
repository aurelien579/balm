const db = require('./db');

const sqlGetByUserId = `
SELECT
    DATE_FORMAT(Reservation.from, '%d %M %Y') AS 'from',
    DATE_FORMAT(Reservation.to, '%d %M %Y') AS 'to',
    Reservation.status,
    Reservation.offerId,
    Offer.title,
    Offer.price,
    Image.path
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
    Reservation.userId = 1
        AND Offer.id = Reservation.offerId;
`;

const sqlAddReservation = `INSERT INTO Reservation(offerId, userId, from, to,status) VALUES(?, ?, ?, ?,?); `


function createReservation(offerId,userId, from, to,status) {
    db.sqlQuery(sqlAddReservation, [offerId, userId, from, to,status]);
}



function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

exports.getByUserId = getByUserId;
exports.createReservation = createReservation;
