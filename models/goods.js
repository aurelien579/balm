const pool = require('./db').pool;


let sqlGetById = 'SELECT * FROM Offer WHERE id = ?;'
let sqlGetByUserId = 'SELECT * FROM Offer WHERE userId = ?;'

var getById = function(id, callback) {
    pool.query(sqlGetById, [id], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results[0]);
        }
    });
}

var getByUserId = function(userId, callback) {
    pool.query(sqlGetByUserId, [userId], (err, results) => {
        callback(err, results);
    });
}

exports.getByUserId = getByUserId;
exports.getById = getById;
