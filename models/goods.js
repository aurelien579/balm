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

const sqlCreate =
    `INSERT INTO Offer
        (userId, title, description, price, department, city, postcode, address)
     VALUES
        (?, ?, ?, ?, ?, ?, ?, ?);`

function getById(id) {
    return db.sqlQuery(sqlGetById, [id]);
}

function getByUserId(userId) {
    return db.sqlQuery(sqlGetByUserId, [userId]);
}

function getByUserIdWithFirstImage(userId) {
    return db.sqlQuery(slqGetByUserIdWithFirstImage, [userId]);
}

function create(userId, title, description, price, department, city, postcode, address) {
    return db.sqlQuery(sqlCreate, [userId, title, description, price, department, city, postcode, address]);
}

exports.getByUserId = getByUserId;
exports.getById = getById;
exports.getByUserIdWithFirstImage = getByUserIdWithFirstImage;
exports.create = create;