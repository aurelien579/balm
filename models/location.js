const db = require('./db');

const sqlGetCity = "SELECT COUNT(*) AS count FROM City WHERE name = ?;";
const sqlGetDepartment = "SELECT COUNT(*) AS count FROM Department WHERE name = ?;";

async function cityExists(city) {
    let result = await db.sqlQuery(sqlGetCity, [city]);
    return result[0].count > 0;
}

async function departmentExists(department) {
    let result = await db.sqlQuery(sqlGetDepartment, [department]);
    return result[0].count > 0;
}

exports.departmentExists = departmentExists;
exports.cityExists = cityExists;
