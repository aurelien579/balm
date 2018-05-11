const db = require('./db');

const sqlAdd = "INSERT INTO Availability (offerId, start, end) VALUES (?, ?, ?)";

function add(offerId, from, to) {
    return db.sqlQuery(sqlAdd, [offerId, from, to]);
}

exports.add = add;