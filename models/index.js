const pool = require('./db').pool;
const db = require('./db');

const sqlGetCities = "SELECT * FROM City WHERE ville_nom_reel = '?%';"

function getCitiesName(startW) {
    return db.sqlQuery(sqlGetCities, [startW]);
}

exports.getCitiesName = getCitiesName;
