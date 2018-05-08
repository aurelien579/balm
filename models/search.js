const pool = require('./db').pool;

let findRegionGetSql = 'SELECT COUNT(*) FROM Region WHERE regionname = ?;';
let findDepartmentGetSql = 'SELECT COUNT(*) FROM Department WHERE departmentname = ?;';
let findCityGetSql = 'SELECT COUNT(*) FROM City WHERE cityname = ?;';
let findPostCodeGetSql = 'SELECT COUNT(*) FROM City WHERE postcode = ?;';

let offerRegionGetSql = 'SELECT * FROM Offer WHERE region = ?;';
let offerDepartmentGetSql = 'SELECT * FROM Offer WHERE department = ?;';
let offerCityGetSql = 'SELECT * FROM Offer WHERE city = ?;';
let offerPostCodeGetSql = 'SELECT * FROM Offer WHERE postcode = ?;';

var getByFindRegion = function(search, callback) {
  pool.query(findRegionGetSql, [search], callback);
}

var getByFindDepartment = function(search, callback) {
  pool.query(findDepartmentGetSql, [search], callback);
}

var getByFindCity = function(search, callback) {
  pool.query(findCityGetSql, [search], callback);
}

var getByFindPostCode = function(search, callback) {
  pool.query(findPostCodeGetSql, [search], callback);
}

var getByOffer = function(search, search_class, callback) {
  if (search_class == 0) {
    callback(err);
  } else if (search_class == 1) {
    pool.query(offerRegionGetSql, [search], callback);
  } else if (search_class == 2) {
    pool.query(offerDepartmentGetSql, [search], callback);
  } else if (search_class == 3) {
    pool.query(offerCityGetSql, [search], callback);
  } else if (search_class == 4) {
    pool.query(offerPostCodeGetSql, [search], callback);
  }
}

exports.getByFindRegion = getByFindRegion;
exports.getByFindDepartment = getByFindDepartment;
exports.getByFindCity = getByFindCity;
exports.getByFindPostCode = getByFindPostCode;

exports.getByOffer = getByOffer;
