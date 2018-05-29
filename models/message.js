const db = require('./db');

const sqlGetByReservationId = 'SELECT * FROM Message WHERE reservationId = ? ORDER BY date;';
const sqlCreate = `
    INSERT INTO Message
        (reservationId, destUserId, sourceUserId, content, date)
    VALUES (?, ?, ?, ?, NOW());
`;

function getByReservationId(reservationId) {
    return db.sqlQuery(sqlGetByReservationId, [reservationId]);
}

function create(reservationId, destUserId, sourceUserId, content) {
    return db.sqlQuery(sqlCreate, [reservationId, destUserId, sourceUserId, content]);
}

exports.getByReservationId = getByReservationId;
exports.create = create;
