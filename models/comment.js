const db = require('./db');

const sqlGetByOfferId =
    `
SELECT
    Comment.rating,
    Comment.content,
    User.firstName
FROM
    Comment,
    User,
    Reservation
WHERE
    Comment.reservationId = Reservation.id
        AND Reservation.offerId = ?
        AND Comment.userId = User.id;
`;

const sqlGetByUserId =
    `
SELECT
    Offer.id AS offerId,
    Comment.rating,
    Comment.content,
    Offer.title,
    User.imagePath,
    User.firstName
FROM
    Offer,
    Comment,
    Reservation,
    User
WHERE
    Offer.userId = ?
        AND Offer.id = Reservation.offerId
        AND Reservation.id = Comment.reservationId
        AND User.id = Comment.userId;
`;

const sqlCreate = 'INSERT INTO Comment (idOffer, idUser, rating, content) VALUES (?, ?, ?, ?);';

function getByOfferId(id) {
    return db.sqlQuery(sqlGetByOfferId, [id]);
}

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

function create(offerId, userId, rating, content) {
    return db.sqlQuery(sqlCreate, [offerId, userId, rating, content]);
}

exports.getByUserId = getByUserId;
exports.getByOfferId = getByOfferId;
exports.create = create;
