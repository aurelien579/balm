const pool = require('./db').pool;
const goodsModel = require('./goods');

const ERROR = -1;
const USERNAME_EXISTS = 1;
const EMAIL_EXISTS = 2;

const userGetSql = 'SELECT * FROM User WHERE email = ?';
const userInsertSql = 'INSERT INTO User(email, firstName, lastName, password) VALUES(?, ?, ?, ?);';

function getByUsername(email, callback) {
    pool.query(userGetSql, [email], (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(err, results[0]);
        }
    });
}

function create(email, firstName, lastName, password, callback) {
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

function getOffersWithImagesAndComments(userId) {
    goodsModel.getByUserIdPRomise(userId).then(function(offer) {

    });
}

exports.create = create;
exports.getByUsername = getByUsername;
exports.USERNAME_EXISTS = USERNAME_EXISTS;
exports.EMAIL_EXISTS = EMAIL_EXISTS;
exports.ERROR = ERROR;
