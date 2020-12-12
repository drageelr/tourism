'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');
const { connect } = require('../routes/trip.route');

exports.createTripReq = async (req, res, next) => {
    try {
        let params = req.body;

        let reqTrip = await db.query('SELECT * FROM trip WHERE id = ' + params.tripID);
        if (!reqTrip.length) { throw new customError.NotFoundError("trip does not exist"); }

        reqTrip[0].startDate.setDate(reqTrip[0].startDate.getDate() + 1)
        let d1 = reqTrip[0].startDate
        let d2 = hFuncs.createDateNowInUTC();
        if (d1 < d2) { throw new customError.BadRequestError("start date of trip has gone by"); }

        let reqTripCapCheck = await db.query('SELECT SUM(numberOfPeople) FROM trip_request WHERE tripID = ' + params.tripID + ' AND accepted = 1')
        if (reqTripCapCheck[0]['SUM(numberOfPeople)'] + params.numberOfPeople >= reqTrip[0].capacity) { throw new customError.BadRequestError("number of people that can be accomodated = " + (reqTrip[0].capacity - reqTripCapCheck[0]['SUM(numberOfPeople)'])); }

        let amountDue = reqTrip[0].price * params.numberOfPeople;
        

        let code = false;
        if (params.code) {
            code = await db.query('SELECT * FROM promo_code WHERE code = "' + params.code + '"');
            if (!code.length) { throw new customError.BadRequestError("promo code does not exist"); }
            let currentDiscount = amountDue * (code[0].discountPercentage / 100);
            if (currentDiscount > code[0].maxDiscount) {
                amountDue -= code[0].maxDiscount;
            } else {
                amountDue -= currentDiscount;
            }
        }

        let insertTripReqQuery = 'INSERT INTO trip_request (tripID, customerID, numberOfPeople, amountDue, accepted';
        let valuesTripReqQuery =  ') VALUES (' + reqTrip[0].id + ', ' + params.user.id + ', ' + params.numberOfPeople + ', ' + amountDue + ', 0';

        if (code) {
            insertTripReqQuery += ', code';
            valuesTripReqQuery += ', "' + params.code + '" ';
        }

        let reqTripReq = await db.query(insertTripReqQuery + valuesTripReqQuery + ')');

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: 'Trip Request Created Successfully!',
            id: reqTripReq.insertId
        })

    } catch(err) {
        next(err);
    }
}

exports.fetchTripReq = async (req, res, next) => {
    try {
        let params = req.body;
        const keys = ["id", "tripID", "customerID", "code", "numberOfPeople", "amountDue", "accepted"];
        const kType = [0, 0, 0, 1, 1, 0, 0, 0];

        let selectTripReqQuery = 'SELECT * FROM trip_request';
        let whereTripReqQuery = ' WHERE';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (whereTripQuery != ' WHERE') { whereTripQuery += ' AND'; }
                whereTripQuery += ' ' + keys[i] + ' = ';
                if (kType[i]) { whereTripQuery += '"'; }
                whereTripQuery += params[keys[i]];
                if (kType[i]) { whereTripQuery += '"'; }
            }
        }

        if (whereTripReqQuery != ' WHERE') { selectTripReqQuery += whereTripReqQuery; }
        let result = await db.query(selectTripReqQuery);

        let tripReqs = [];
        for (let i = 0; i < result.length; i++) {
            tripReqs.push(hFuncs.duplicateObject(result[i], keys));
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trip Requests Fetched Successfully!",
            tripReqs: tripReqs
        });

    } catch(err) {
        next(err);
    }
}

exports.fetchTripReqCustomer = async (req, res, next) => {
    try {
        let params = req.body;
        const keys = ["id", "tripID", "customerID", "code", "numberOfPeople", "amountDue", "accepted"];
        const kType = [0, 0, 0, 1, 1, 0, 0, 0];

        let selectTripReqQuery = 'SELECT * FROM trip_request WHERE customerID = ' + params.user.id;
        let whereTripReqQuery = '';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined && i != 2) {
                whereTripQuery += ' AND';
                whereTripQuery += ' ' + keys[i] + ' = ';
                if (kType[i]) { whereTripQuery += '"'; }
                whereTripQuery += params[keys[i]];
                if (kType[i]) { whereTripQuery += '"'; }
            }
        }

        if (whereTripReqQuery != '') { selectTripReqQuery += whereTripReqQuery; }
        let result = await db.query(selectTripReqQuery);

        let tripReqs = [];
        for (let i = 0; i < result.length; i++) {
            tripReqs.push(hFuncs.duplicateObject(result[i], keys));
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trip Requests Fetched Successfully!",
            tripReqs: tripReqs
        });
        
    } catch(err) {
        next(err);
    }
}

exports.editTripReq = async (req, res, next) => {
    try {
        let params = req.body;
        const keys = ["numberOfPeople", "amountDue", "accepted"];
        
        let reqTripReq = await db.query('SELECT * FROM trip_request WHERE id = ' + params.id);
        if (!reqTripReq.length) { throw new customError.NotFoundError("trip request not found"); }

        let updateTripReqQuery = 'UPDATE trip_request SET';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (updateTripReqQuery != 'UPDATE trip_request SET') { updateTripReqQuery += ' , '; }
                updateTripReqQuery += ' ' + keys[i] + ' = ' + params[keys[i]];
            }
        }

        if (updateTripReqQuery != 'UPDATE trip_request SET') {
            await db.query(updateTripReqQuery);
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trip Request Edited Successfully!"
        });
        
    } catch(err) {
        next(err);
    }
}