const pool = require('./db').pool;


let sqlGetById = 'SELECT * FROM Comment WHERE idOffer = ?;'

var getById = function(id, callback) {
    pool.query(sqlGetById, [id], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results);
        }
    });
}

exports.getById = getById;
