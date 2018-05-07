const pool = require('./db').pool;


let sqlGetById = 'SELECT * FROM Offer WHERE Id = ?';

var getById = function (id, callback) {
    pool.query(sqlGetById,[id], (err, results) => {
        if(err){
            callback(err);
        }else{
            callback(err,results[0]);
        }
    });
}

exports.getById = getById;
