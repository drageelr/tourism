'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');

exports.createLocation = async (req, res, next) => {
    try {
        let params = req.body;
        let result = await db.query('INSERT INTO location (site, city, province) VALUES ("' + params.site + '", "' + params.city +'", "' + params.province + '")');
        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Location Created Successfully",
            id: result.insertId
        });
    } catch(err) {
        next(err);
    }
}

exports.fetchLocation = async (req, res, next) => {
    try {
        let params = req.body;
        const keys = ["id", "site", "city", "province"];
        const kType = [0, 1, 1, 1];

        let selectLocationQuery = 'SELECT * FROM location';
        let whereLocationQuery = ' WHERE';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (whereLocationQuery != ' WHERE') { whereLocationQuery += ' AND'; }
                whereLocationQuery += ' ' + keys[i] + ' = ';
                if (kType[i]) { whereLocationQuery += '"'; }
                whereLocationQuery += params[keys[i]];
                if (kType[i]) { whereLocationQuery += '"'; }
            }
        }

        if (whereLocationQuery != ' WHERE') { selectLocationQuery += whereLocationQuery; }        
        let result = await db.query(selectLocationQuery);

        let locations = [];
        for (let i = 0; i < result.length; i++) {
            locations.push(hFuncs.duplicateObject(result[i], keys));
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Location Fetched Successfully!",
            locations: locations
        });
        
    } catch(err) {
        next(err);
    }
}