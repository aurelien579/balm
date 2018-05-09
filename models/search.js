const db = require('./db');

const offerGetSql = 'SELECT * FROM Offer WHERE postcode = ? OR city = ? OR department = ? OR region = ?;'
const testofferGetSql ='SELECT o.* FROM Offer AS o, Availability AS a WHERE o.id = a.offerId AND (o.postcode = ? OR o.city = ? OR o.department = ? OR o.region = ?) AND a.start <= ? AND a.end >= ?;'

const offer1 = 'SELECT O.* FROM Offer AS O, Availability AS A WHERE O.id = A.offerId'
const offer2 = ' AND (O.postcode = ? OR O.city = ? OR O.department = ? OR O.region = ?)'
const offer3 = ' AND A.start <= ?'
const offer3 = ' AND A.end >= ?'
const offerclose = ';'

var getByOffer = function(search, callback) {
  const offertest = offer1;
  if (!!search.text)
    offertest += offer2;
  if (!!search.datedep)
    offertest += offer3;
  if (!!search.datearr)
    offertest += offer4;
  offertest += offerclose;
  return db.sqlQuery(testofferGetSql, [search.text, search.text, search.text, search.text, search.datedep, search.datearr]);
}
/*
var getByOffer = function(search, callback) {
  return db.sqlQuery(offerGetSql, [search, search, search, search]);
}
*/
exports.getByOffer = getByOffer;
