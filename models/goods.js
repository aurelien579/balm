const db = require('./db');

const sqlGetById = 'SELECT * FROM Offer WHERE id = ?;';
const sqlGetUserId = 'SELECT Offer.userId FROM Offer WHERE id = ?;';
const sqlGetByUserId = 'SELECT * FROM Offer WHERE userId = ?;';

const sqlDelete = 'DELETE FROM Offer WHERE id = ?;';
const sqlDeleteRes = 'DELETE FROM Reservation WHERE offerid = ?;';
const sqlDeleteImg = 'DELETE FROM Image WHERE offerId = ?;';
const sqlDeleteCom = 'DELETE FROM Comment WHERE idOffer = ?;';
const sqlDeleteDisp = 'DELETE FROM Availability WHERE offerId = ?;';

const slqGetByUserIdWithFirstImage =
    `SELECT Offer.id, Offer.title, Offer.description, Offer.price, COALESCE(Image.path, '/images/offers/default.jpg') AS path
    FROM Offer LEFT JOIN Image ON Image.id =
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

const sqlEdit = "UPDATE Offer SET title = ?, description = ?, price = ?, department = ?, city = ?, postcode = ?, address = ? WHERE id = ?;"

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

function getUserId(offerId) {
    return db.sqlQuery(sqlGetUserId, [offerId]);
}

function deleteOffer(offerId) {
    db.sqlQuery(sqlDeleteRes, [offerId]);
    db.sqlQuery(sqlDeleteDisp, [offerId]);
    db.sqlQuery(sqlDeleteImg, [offerId]);
    db.sqlQuery(sqlDeleteCom, [offerId]);

    return db.sqlQuery(sqlDelete, [offerId]);
}

function.sqlEdit(OfferId, title, description, price, department, city, postcode, address) {
    return db.sqlQuery(sqlEdit, [title, description, price, department, city, postcode, address, OfferId]);
}

exports.sqlEdit = sqlEdit;
exports.getUserId = getUserId;
exports.deleteOffer = deleteOffer;
exports.getByUserId = getByUserId;
exports.getById = getById;
exports.getByUserIdWithFirstImage = getByUserIdWithFirstImage;
exports.create = create;
