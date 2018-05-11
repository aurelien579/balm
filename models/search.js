const db = require('./db');

const offerSql = {
  base : 'SELECT O.* FROM Offer AS O, Availability AS A WHERE O.id = A.offerId',
  text: ' AND (O.postcode = ? OR O.city = ? OR O.department = ? OR O.region = ?)',
  datedep: ' AND A.start <= ? AND A.end >= ?',
  datearr: ' AND A.end >= ? AND A.start <= ?',
  pool: ' AND O.pool = 1',
  garden: ' AND O.garden = 1',
  city: ' AND O.city = 1',
  close: ';'
};


var getByOffer = function(search, callback) {
  let offerGetSql = offerSql.base;
  if (!!search.text)
    offerGetSql += offerSql.text; // Gérer recherche null
  if (!!search.datedep)
    offerGetSql += offerSql.datedep;
  if (!!search.datearr)
    offerGetSql += offerSql.datearr;
  if (!!search.pool)
    offerGetSql += offerSql.pool;
  if (!!search.garden)
    offerGetSql += offerSql.garden;
  if (!!search.city)
    offerGetSql += offerSql.city;
  offerGetSql += offerSql.close;
  console.log(offerGetSql);
  return db.sqlQuery(offerGetSql, [search.text, search.text, search.text, search.text, search.datedep, search.datedep, search.datearr, search.datearr]);
}
/*
var getByOffer = function(search, callback) {
  return db.sqlQuery(offerGetSql, [search, search, search, search]);
}
*/
exports.getByOffer = getByOffer;
