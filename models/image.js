const pool = require('./db').pool;

let sqlGetByUserId = "SELECT path, offerId FROM Image, Offer, User WHERE User.id = Offer.userId AND Image.offerId = Offer.id AND User.id = ?;";

var getByUserId = function(userId, callback) {
    pool.query(sqlGetByUserId, userId, callback);
}

let sqlGetByOfferId = "SELECT path FROM Image WHERE offerId = ?;";


var getByOfferId =function(offerId,callback){
  pool.query(sqlGetByOfferId,[offerId] ,(err, results)=>{
      if (err) {
          callback(err);
      } else {
          callback(err, results);
      }
  });
}

module.exports.getByUserId = getByUserId;
module.exports.getByOfferId = getByOfferId;
