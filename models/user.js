const pool = require('./db').pool;

const ERROR = -1;
const USERNAME_EXISTS = 1;
const EMAIL_EXISTS = 2;

let userGetSql = 'SELECT * FROM User WHERE email = ?';
let userInsertSql = 'INSERT INTO User(email, firstName, lastName, password) VALUES(?, ?, ?, ?);';

var getByUsername = function(email, callback) {
    pool.query(userGetSql, [email], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results[0]);
        }
    });
}

var create = function(email, firstName, lastName, password, callback) {
    pool.query(userInsertSql, [email, firstName, lastName, password], (err, result) => {
        if (err) {
            err.code = ERROR;
            if (err.message.indexOf("UNIQUE constraint failed") != -1) {
                if (err.message.indexOf("username") != -1)
                    err.code = USERNAME_EXISTS;
                else if (err.message.indexOf("email") != -1)
                    err.code = EMAIL_EXISTS;
            }
        }

        callback(err, result);
    });
}

exports.create = create;
exports.getByUsername = getByUsername;
exports.USERNAME_EXISTS = USERNAME_EXISTS;
exports.EMAIL_EXISTS = EMAIL_EXISTS;
exports.ERROR = ERROR;
