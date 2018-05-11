const db = require('./db');

const sqlGetCities = "SELECT name FROM City WHERE name LIKE CONCAT(?,'%') LIMIT 5;"

function getCitiesName(startW) {
    return db.sqlQuery(sqlGetCities, [startW]);
}

exports.getCitiesName = getCitiesName;
