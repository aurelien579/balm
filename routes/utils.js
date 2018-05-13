function mustBeConnected(req, res, next) {
    if (!req.session.user) {
        console.log('Access violation!');
        res.redirect('/');
    } else {
        next();
    }
}

function mustBeConnectedToBook(req, res, next) {
    if (!req.session.user) {
        res.redirect('/user/login?prev=/goods/' + req.query.id);
    } else {
        next();
    }
}

module.exports.mustBeConnectedToBook = mustBeConnectedToBook;
module.exports.mustBeConnected = mustBeConnected;
