'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');
const { param } = require('../routes/trip.route');

async function validateLocations(locationIDs) {
    if (locationIDs !== undefined) {
        let locationQuery = "SELECT count(*) distinct FROM trip_location WHERE id IN (";
        for (let i = 0; i < locationIDs.length; i++){
            if (i < locationIDs.length - 1){
                locationQuery += locationIDs[i] + ",";
            } else {
                locationQuery += locationIDs[i] +")";
            }
        }

        if (locationQuery != "SELECT count(*) distinct FROM trip_location WHERE id IN ("){
            let result = await db.query(locationQuery);
            if (result["count(*)"] != locationIDs.length) {
                return false;
            }
        }
    }

    return true;
}

function constructTripLocString(locationIDs, tripID) {
    let locationStrings = [];
    let locationValues = "";
    if (locationIDs !== undefined) {
        if (locationIDs.length) {
            for (let i = 0; i < locationIDs.length; i++) {
                locationStrings.push("(" + tripID + "," + locationIDs[i] + ")");
            }
            for (let i = 0; i < locationStrings.length-1; i++) {
                locationValues += locationStrings[i] + ",";
            }
            locationValues += locationStrings[locationStrings.length - 1];
        }
    }
    
    return locationValues;
}

function constructLocationString(locationIDs) {
    let locationString = ""

    if (locationIDs !== undefined) {
        if (locationIDs.length) {
            locationString = "(";
            for (let i = 0; i < locationIDs.length - 1; i++) {
                locationString += locationIDs[i] + ", ";    
            }
            locationString += locationIDs[locationIDs.length - 1] + ")";
        }
    }

    return locationString;
}

exports.createTrip = async (req, res, next) => {
    try {
        let params = req.body;

        let locationCheck = await validateLocations(params.locationIDs);
        if (!locationCheck) { throw new customError.DuplicateResourceError("invalid or duplicate location id"); }

        let result = await db.query('INSERT INTO trip (adminID, name, description, itienrary, price, capacity, startDate, endDate) VALUES (' +params.user.id + ',"' + params.name + '", "' + params.description + '", "' + params.itienrary + '",' + params.price + ',' + params.capacity + ', ' + hFuncs.toDateMySql(params.startDate) + ', ' + hFuncs.toDateMySql(params.endDate) +  ')');
        
        let locationValues = constructTripLocString(params.locationIDs, result.insertId);
        if (locationValues != "") {
            await db.query('INSERT INTO trip_location (tripID, locationID) VALUES ' + locationValues);
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trip created Successfully",
            id: result.insertId
        });
    } catch(err) {
        next(err);
    }
}
exports.fetchTrip = async (req, res, next) => {
    try {
        let params = req.body;
        const keys = ["id", "adminID", "name", "description", "itienrary", "price", "capacity", "startDate", "endDate"];
        const kType = [0, 0, 1, 1, 1, 0, 0, 2, 3];

        let selectTripQuery = 'SELECT * FROM trip';
        let whereTripQuery = ' WHERE';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (whereTripQuery != ' WHERE') { whereTripQuery += ' AND'; }
                whereTripQuery += ' ' + keys[i] + ' ';
                if (kType[i] == 2) { whereTripQuery += '>'; }
                else if (kType[i] == 3) { whereTripQuery +=  '<'; }
                whereTripQuery += '= ';
                if (kType[i] == 1) { whereTripQuery += '"'; }
                if (kType[i] == 2 || kType[i] == 3) { whereTripQuery += hFuncs.toDateMySql(params[keys[i]]); }
                else { whereTripQuery += params[keys[i]]; }
                if (kType[i] == 1) { whereTripQuery += '"'; }
            }
        }

        let locationString = constructLocationString(params.locationIDs);
        if (locationString != "") {
            if (whereTripQuery != ' WHERE') { whereTripQuery += ' AND'; }
            whereTripQuery += ' id IN ' + locationString;
        }

        if (whereTripQuery != ' WHERE') { selectTripQuery += whereTripQuery; }
        let result = await db.query(selectTripQuery);

        let trips = [];
        for (let i = 0; i < result.length; i++) {
            let trip = hFuncs.duplicateObject(result[i], keys);
            trip.startDate = hFuncs.createDateFromMysqlDate(trip.startDate);
            trip.endDate = hFuncs.createDateFromMysqlDate(trip.endDate);
            trips.push(trip);
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trips Fetched Successfully!",
            trips: trips
        });

    } catch(err) {
        next(err);
    }
}

exports.editTrip = async (req, res, next) => {
    try {
        let params = req.body;
        const keys = ["id", "name", "description", "itienrary", "price", "capacity", "startDate", "endDate"];
        const kType = [0, 1, 1, 1, 0, 0, 2, 2];

        let reqTrip = await db.query('SELECT * FROM trip WHERE id = ' + params.id);
        if (!reqTrip.length) { throw new customError.NotFoundError("trip not found"); }

        let locationCheck = await validateLocations(params.locationIDs);
        if (!locationCheck) { throw new customError.DuplicateResourceError("invalid or duplicate location id"); }

        let locationValues = constructTripLocString(params.locationIDs, params.id);
        if (locationValues != "") {
            await db.query('DELETE FROM trip_location WHERE tripID = ' + params.id);
            await db.query('INSERT INTO trip_location (tripID, locationID) VALUES ' + locationValues);
        }

        let updateTripQuery = 'UPDATE trip SET';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (updateTripQuery != 'UPDATE trip SET') { updateTripQuery += ' , '; }
                updateTripQuery += ' ' + keys[i] + ' = ';
                if (kType[i] == 1) { updateTripQuery += '"'; }
                if (kType[i] == 2) { updateTripQuery += hFuncs.toDateMySql(params[keys[i]]); }
                else { updateTripQuery += params[keys[i]]; }
                if (kType[i] == 1) { updateTripQuery += '"'; }
            }
        }

        if (updateTripQuery != 'UPDATE trip SET') {
            await db.query(updateTripQuery);
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Trip Edited Sucessfully!!"
        })
 
    } catch(err) {
        next(err);
    }
}