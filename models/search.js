const db = require('./db');

const offerGetSqlBase = 'SELECT O.* FROM Offer AS O, Availability AS A WHERE O.id = A.offerId'
const offerGetSqlText = ' AND (O.postcode = ? OR O.city = ? OR O.department = ? OR O.region = ?)'
const offerGetSqlDatedep = ' AND A.start <= ?'
const offerGetSqlDatearr = ' AND A.end >= ?'
const offerGetSqlClose = ';'

var getByOffer = function(search, callback) {
  let offerGetSql = offerGetSqlBase;
  if (!!search.text)
    offerGetSql += offerGetSqlText;
  if (!!search.datedep)
    offerGetSql += offerGetSqlDatedep;
  if (!!search.datearr)
    offerGetSql += offerGetSqlDatearr;
  offerGetSql += offerGetSqlClose;
  return db.sqlQuery(offerGetSql, [search.text, search.text, search.text, search.text, search.datedep, search.datearr]);
}
/*
var getByOffer = function(search, callback) {
  return db.sqlQuery(offerGetSql, [search, search, search, search]);
}
*/
exports.getByOffer = getByOffer;
