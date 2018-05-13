const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const expressValidator = require('express-validator');

const app = express();
module.exports = app;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');
const goodsRouter = require('./routes/goods');
const reservationRouter = require('./routes/reservation');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(fileUpload());

app.use(session({
    secret: 'qsfqsdlgjksdfmjxcbxcvvfuhvlzks',
    resave: false,
    saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);
app.use('/goods', goodsRouter);
app.use('/reservation', reservationRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;