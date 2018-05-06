const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'balm',
    password: 'balm',
    database: 'Balm',
    connectionLimit: 10
});

module.exports.pool = pool;
