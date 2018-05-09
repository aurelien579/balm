const pool = require('./db').pool;

const sqlGetById = 'SELECT * FROM Comment WHERE idOffer = ?;'

function getByOfferId(id, callback) {
    pool.query(sqlGetById, [id], callback);
}

function getByUserId(userId) {

}

exports.getByOfferId = getByOfferId;