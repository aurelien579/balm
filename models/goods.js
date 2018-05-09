const db = require('./db');

const sqlGetById = 'SELECT * FROM Offer WHERE id = ?;'
const sqlGetByUserId = 'SELECT * FROM Offer WHERE userId = ?;'

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

exports.getByUserId = getByUserId;
exports.getById = getById;