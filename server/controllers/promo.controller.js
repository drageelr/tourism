'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');

exports.createPromo = async (req, res, next) => {
    try {
        let params = req.body;
        let result = await db.query('INSERT INTO promo_code (code, maxDiscount, discountPercentage) VALUES ("' + params.code + '", "' + params.maxDiscount +'", "' + params.discountPercentage + '")');
        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Promo code created Successfully",
            id: result.insertId
        })
    } catch(err) {
        next(err);
    }
}