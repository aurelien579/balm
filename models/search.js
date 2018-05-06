const pool = require('./db').pool;

let offerCityGetSql = 'SELECT * FROM Offer WHERE City = ?';

var getByOfferCity = function(city, callback) {
    pool.query(offerCityGetSql, [city], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results);
        }
    });
}

exports.getByOfferCity = getByOfferCity;
