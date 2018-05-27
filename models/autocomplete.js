const db = require('./db');

const sqlGetCities = "SELECT name FROM City WHERE name LIKE CONCAT(?,'%') LIMIT 5;"
const sqlGetDepartements = "SELECT name FROM Department WHERE name LIKE CONCAT(?,'%') LIMIT 5;"
const sqlGetRegions = "SELECT name FROM Region WHERE name LIKE CONCAT(?,'%') LIMIT 5;"

function getCitiesName(startW) {
    return db.sqlQuery(sqlGetCities, [startW]);
}

function getDepartementsName(startW) {
    return db.sqlQuery(sqlGetDepartements, [startW]);
}

function getRegionsName(startW) {
    return db.sqlQuery(sqlGetRegions, [startW]);
}

exports.getCitiesName = getCitiesName;
exports.getRegionsName = getRegionsName;
exports.getDepartementsName = getDepartementsName;
