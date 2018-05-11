const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'balm',
    password: 'balm',
    database: 'Balm',
    connectionLimit: 10
});

pool.query('SET lc_time_names = "fr_FR";');

function sqlQuery(sql, args) {
    return new Promise(function(resolve, reject) {
        pool.query(sql, args, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports.pool = pool;
module.exports.sqlQuery = sqlQuery;