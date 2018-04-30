const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('db/data.sqlite3', (err) => {
  if (err) {
    console.log(err);
  }
});

const ERROR = -1;
const USERNAME_EXISTS = 1;
const EMAIL_EXISTS = 2;

let userGetSql = 'SELECT * FROM Users WHERE username = ?';
let userInsertSql = 'INSERT INTO Users(username, password, email) VALUES(?, ?, ?);';

var getByUsername = function(username, callback) {
  db.each(userGetSql, [username], (err, row) => {
    callback(err, row);
  });
}

var create = function(username, password, email, callback) {
  db.run(userInsertSql, [username, password, email], (err) => {
    if (err) {
      err.code = ERROR;
      if (err.message.indexOf("UNIQUE constraint failed") != -1) {
        if (err.message.indexOf("username") != -1)
          err.code = USERNAME_EXISTS;
        else if (err.message.indexOf("email") != -1)
          err.code = EMAIL_EXISTS;
      }

      callback(err);
    } else {
      getByUsername(username, (_, row) => {
        callback(err, username);
      });
    }
  });
}

exports.create = create;
exports.getByUsername = getByUsername;
exports.USERNAME_EXISTS = USERNAME_EXISTS;
exports.EMAIL_EXISTS = EMAIL_EXISTS;
exports.ERROR = ERROR;
