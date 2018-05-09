const db = require('./db');

const sqlGetById = 'SELECT * FROM Offer WHERE id = ?;';
const sqlGetByUserId = 'SELECT * FROM Offer WHERE userId = ?;';

const slqGetByUserIdWithFirstImage =
    `SELECT Offer.title, Offer.description, Offer.price, Image.path FROM Offer LEFT JOIN Image ON Image.id =
    (
    	SELECT id FROM Image
    	WHERE Image.offerId = Offer.id
    	ORDER BY id
    	LIMIT 1
    ) WHERE Offer.userId = ?;`;

var getById = function(id, callback) {
    db.pool.query(sqlGetById, [id], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results[0]);
        }
    });
}

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

function getByUserIdWithFirstImage(userId) {
    return db.sqlQuery(slqGetByUserIdWithFirstImage, [userId]);
}

exports.getByUserId = getByUserId;
exports.getById = getById;
exports.getByUserIdWithFirstImage = getByUserIdWithFirstImage;