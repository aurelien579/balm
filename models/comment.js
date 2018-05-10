const db = require('./db');

const sqlGetById =
                    `
                    SELECT
                      Comment.rating, Comment.content, User.firstName
                    FROM
                      Comment, User
                    WHERE
                      Comment.idOffer = ?
                      AND Comment.idUser = User.id ;
                    `;
const sqlGetByUserId =
    `
    SELECT
        Comment.idOffer, User.firstName, Comment.rating, Comment.content, Offer.title, User.imagePath
    FROM
        Offer, Comment, User
    WHERE
        Offer.userId = 1
            AND Offer.id = Comment.idOffer
            AND User.id = Comment.idUser;
    `;

function getByOfferId(id) {
    return db.sqlQuery(sqlGetById, [id]);
}

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

exports.getByUserId = getByUserId;
exports.getByOfferId = getByOfferId;
