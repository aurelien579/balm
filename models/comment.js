const db = require('./db');

const sqlGetById = 'SELECT * FROM Comment WHERE idOffer = ?;'
const sqlGetByUserId =
    `
    SELECT
        User.firstName, Comment.rating, Comment.content, Offer.title, User.imagePath
    FROM
        Offer, Comment, User
    WHERE
        Offer.userId = 1
            AND Offer.id = Comment.idOffer
            AND User.id = Comment.idUser;
    `;

function getByOfferId(id, callback) {
    db.pool.query(sqlGetById, [id], callback);
}

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

exports.getByUserId = getByUserId;
exports.getByOfferId = getByOfferId;