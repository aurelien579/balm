const db = require('./db');

const WAITING = 0;
const ACCEPTED = 1;
const REJECTED = 2;
const ABORTED = 3;

const sqlAccept = 'UPDATE Reservation SET status = 1 WHERE id = ?;';
const sqlReject = 'UPDATE Reservation SET status = 2 WHERE id = ?;';
const sqlGetStatus = 'SELECT status FROM Reservation WHERE id = ?;';

const sqlGetByUserId = `
SELECT
    Reservation.id,
    DATE_FORMAT(Reservation.from, '%d %M %Y') AS 'from',
    DATE_FORMAT(Reservation.to, '%d %M %Y') AS 'to',
    DATE_FORMAT(Reservation.to, '%Y-%m-%d') AS 'to2',
    Reservation.status,
    Reservation.offerId,
    Offer.title,
    Offer.price,
    Offer.type,
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

const sqlGetByUserIdWithCommentCount = `
SELECT
    Reservation.id,
    DATE_FORMAT(Reservation.from, '%d %M %Y') AS 'from',
    DATE_FORMAT(Reservation.to, '%d %M %Y') AS 'to',
    DATE_FORMAT(Reservation.to, '%Y-%m-%d') AS 'to2',
    Reservation.status,
    Reservation.offerId,
    Offer.title,
    Offer.price,
    Offer.type,
    COALESCE(Image.path, '/images/offers/default.jpg') AS path,
    COUNT(Comment.id) AS commentsCount,
    Reservation.to <= CURDATE() AS past
FROM
    Reservation
		INNER JOIN
    Offer ON Offer.id = Reservation.offerId
        LEFT JOIN
    Image ON Image.id = (SELECT
            id
        FROM
            Image
        WHERE
            Image.offerId = Offer.id
        ORDER BY id
        LIMIT 1)
        LEFT JOIN
	Comment ON Comment.reservationId = Reservation.id
WHERE
    Reservation.userId = ?
GROUP BY Reservation.id, Image.id;
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

const sqlAddReservation = `INSERT INTO Reservation(offerId, userId, \`from\`, \`to\`,\`status\`,nbPersonnes, echangeOfferId) VALUES(?, ?, ?, ?, ?, ?, ?); `;
const sqlAbortOverlapping = `
    UPDATE Reservation SET status = 4
    WHERE offerId = ? AND
		  ((\`from\` >= ? AND \`from\` <= ?) OR (\`to\` >= ? AND \`to\` <= ?)) AND
          status = 0;`;

const sqlGetOwner = `
    SELECT User.id, firstName, lastName
    FROM
        Reservation
            INNER JOIN Offer ON Reservation.offerId = Offer.id
            INNER JOIN User ON Offer.userId = User.id
    WHERE Reservation.id = ?;
`;

const sqlGetClient = `
    SELECT User.id, firstName, lastName
    FROM
        Reservation
            INNER JOIN User ON Reservation.userId = User.id
    WHERE Reservation.id = ?;
`;

function createReservation(offerId, userId, from, to, status, nbPersonnes, echangeOfferId) {
    return db.sqlQuery(sqlAddReservation, [offerId, userId, from, to, status, nbPersonnes, echangeOfferId]);
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

function get(id) {
    return db.sqlQuery('SELECT * FROM Reservation WHERE id = ?;', [id]);
}

function abortOverlapping(offerId, start, end) {
    return db.sqlQuery(sqlAbortOverlapping, [offerId, start, end, start, end]);
}

function getByUserIdWithCommentCount(userId) {
    return db.sqlQuery(sqlGetByUserIdWithCommentCount, [userId]);
}

function getOwner(reservationId) {
    return db.sqlQuery(sqlGetOwner, [reservationId]);
}

function getClient(reservationId) {
    return db.sqlQuery(sqlGetClient, [reservationId]);
}

exports.getByUserId = getByUserId;
exports.createReservation = createReservation;
exports.getDemandsTo = getDemandsTo;
exports.accept = accept;
exports.reject = reject;
exports.getStatus = getStatus;
exports.get = get;
exports.abortOverlapping = abortOverlapping;
exports.getByUserIdWithCommentCount = getByUserIdWithCommentCount;
exports.getOwner = getOwner;
exports.getClient = getClient;

exports.WAITING = WAITING;
exports.ACCEPTED = ACCEPTED;
exports.REJECTED = REJECTED;
exports.ABORTED = ABORTED;
