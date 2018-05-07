const pool = require('./db').pool;

let offerCityGetSql = 'SELECT * FROM Offer WHERE city = ?';

var getByOfferCity = function(search, callback) {
    pool.query(offerCityGetSql, [search], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results);
        }
    });
}

exports.getByOfferCity = getByOfferCity;
