var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./services/mysql');
var { errorHandler } = require('./errors/errorhandler');

var authRouter = require('./routes/auth.route');
var accountRouter = require('./routes/account.route');
var locRouter = require('./routes/location.route');
var promoRouter = require('./routes/promo.route');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);
app.use('/api/location',locRouter);
app.use('/api/promo',promoRouter);

app.use(errorHandler);

db.con.connect();

db.defaultAdmin();

module.exports = app;
