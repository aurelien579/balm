const pool = require('./db').pool;

const sqlGetCities = "SELECT * FROM City WHERE ville_nom_reel = '?%';"

function getCitiesName(startW, callback) {
    pool.query(sqlGetCities, [startW], callback);
}

exports.getCitiesName = getCitiesName;
