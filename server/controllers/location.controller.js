'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');

exports.createLocation = async (req, res, next) => {
    try {
        let params = req.body;
        //site city province
        let result = await db.query('INSERT INTO location (site, city, province) VALUES ("' + params.site + '", "' + params.city +'", "' + params.province + '")');
        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Location created Successfully",
            id: result.insertId
        })
    } catch(err) {
        next(err);
    }
}