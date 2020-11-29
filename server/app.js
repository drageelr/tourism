var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./services/mysql');
var { errorHandler } = require('./errors/errorhandler');

var authRouter = require('./routes/auth.route');
var accountRouter = require('./routes/account.route');
var tripRouter = require('./routes/trip.route');
var locRouter = require('./routes/location.route');
var promoRouter = require('./routes/promo.route');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add headers for CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);
app.use('/api/location',locRouter);
app.use('/api/code',promoRouter);
app.use('/api/trip',tripRouter);

app.use(errorHandler);

db.con.connect();

db.defaultAdmin();

module.exports = app;
