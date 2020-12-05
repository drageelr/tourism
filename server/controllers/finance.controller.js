'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');

exports.fetchMonthlyStatement = async (req, res, next) => {
    try {
        let params = req.body;

        let dStart = new Date(Date.UTC(params.year, params.month, 1));
        let dEnd = new Date(Date.UTC(params.year, params.month + 1, 0));

        let totalamount = await db.query('SELECT SUM(amountDue) FROM trip_request WHERE accepted = 1 AND tripID IN (SELECT id FROM trip WHERE startDate >= ' + hFuncs.toDateMySql(dStart.toISOString()) + ' AND startDate <= ' + hFuncs.toDateMySql(dEnd.toISOString()) +  + ')');

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Monthly Statement Fetched Successfully!",
            totalAmount: totalamount[0]['SUM(amountDue)']
        })

    } catch(err) {
        next(err);
    }
}

exports.fetchYearlyStatement = async (req, res, next) => {
    try {
        let params = req.body;

        let dStart = new Date(Date.UTC(params.year, 0, 1));
        let dEnd = new Date(Date.UTC(params.year, 12, 0));

        let totalamount = await db.query('SELECT SUM(amountDue) FROM trip_request WHERE accepted = 1 AND tripID IN (SELECT id FROM trip WHERE startDate >= ' + hFuncs.toDateMySql(dStart.toISOString()) + ' AND startDate <= ' + hFuncs.toDateMySql(dEnd.toISOString()) +  + ')');

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Yearly Statement Fetched Successfully!",
            totalAmount: totalamount[0]['SUM(amountDue)']
        })

    } catch(err) {
        next(err);
    }
}