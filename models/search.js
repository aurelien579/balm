const db = require('./db');

const offerSql = {
    base: `SELECT
                O.*,
                AVG(C.rating) AS avg,
                count(C.content) AS nbCom,
                COALESCE(I.path, '/images/offers/default.jpg') AS path
          FROM
                Availability AS A,
                Offer AS O LEFT JOIN Comment AS C ON C.idOffer = O.id
                LEFT JOIN Image AS I ON I.id =
                (
                	SELECT id FROM Image
                	WHERE Image.offerId = O.id
                	ORDER BY id
                	LIMIT 1
                )
          WHERE O.id = A.offerId`,
    text: ` AND (O.postcode = ? OR O.city = ? OR O.department = ? OR O.region = ?)`,
    datedep: ` AND A.start <= ? AND A.end >= ?`,
    datearr: ` AND A.end >= ? AND A.start <= ?`,
    nbpeople: ` AND O.nbpeople >= ?`,
    pool: ` AND O.pool = 1`,
    garden: ` AND O.garden = 1`,
    city: ` AND O.citycenter = 1`,
    hebergement: ` AND O.type = 0`,
    echange: ` AND O.type = 1`,
    location: ` AND O.prix != 0`,
    close: ` GROUP BY O.id, I.path;`
};


var getByOffer = function(search) {
    let offerGetSql = offerSql.base;

    if (!!search.text) {
        offerGetSql += offerSql.text;
        offerGetSql = offerGetSql.replace(/\?/g, "'" + search.text + "'");
    }

    if (!!search.datedep) {
        offerGetSql += offerSql.datedep;
        offerGetSql = offerGetSql.replace(/\?/g, "'" + search.datedep + "'");
    }

    if (!!search.datearr) {
        offerGetSql += offerSql.datearr;
        offerGetSql = offerGetSql.replace(/\?/g, "'" + search.datearr + "'");
    }

    if (!!search.numberpers) {
        offerGetSql += offerSql.nbpeople;
        offerGetSql = offerGetSql.replace(/\?/g, "'" + search.numberpers + "'");
    }

    if (search.echange && !(search.location || search.hebergement)) {
        offerGetSql += offerSql.echange;
    } else if (search.location || search.hebergement) {
        if (search.location) {
            offerGetSql += offerSql.location;
        }

        if (search.hebergement) {
            offerGetSql += offerSql.hebergement;
        }
    }


    if (!!search.pool)
        offerGetSql += offerSql.pool;

    if (!!search.garden)
        offerGetSql += offerSql.garden;

    if (!!search.city)
        offerGetSql += offerSql.city;

    offerGetSql += offerSql.close;

    return db.sqlQuery(offerGetSql);
}

exports.getByOffer = getByOffer;
