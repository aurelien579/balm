const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'balm',
    password: 'balm',
    database: 'Balm',
    connectionLimit: 10
});

pool.query('SET lc_time_names = "fr_FR";');

pool.on('connection', function(connection) {
    connection.on('enqueue', function(sequence) {
        // if (sequence instanceof mysql.Sequence.Query) {
        if ('Query' === sequence.constructor.name) {
            console.log('SQL ', sequence.sql);
        }
    });
});

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