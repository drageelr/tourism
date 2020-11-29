'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');

exports.createPromo = async (req, res, next) => {
    try {
        let params = req.body;

        let reqCode = await db.query('SELECT * FROM promo_code WHERE code = "' + params.code + '"');
        if (reqCode.length) { throw new customError.DuplicateResourceError("promo code already exists"); }

        let result = await db.query('INSERT INTO promo_code (code, maxDiscount, discountPercentage) VALUES ("' + params.code + '", ' + params.maxDiscount +', ' + params.discountPercentage + ')');
        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Promo Code Created Successfully",
        })
    } catch(err) {
        next(err);
    }
}

exports.fetchPromo = async (req, res, next) => {
    try {
        let params = req.body;
        const keys = ["code", "maxDiscount", "discountPercentage"];
        const kType = [1, 0, 0];

        let selectPromoQuery = 'SELECT * FROM promo_code';
        let wherePromoQuery = ' WHERE';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (wherePromoQuery != ' WHERE') { wherePromoQuery += ' AND'; }
                wherePromoQuery += ' ' + keys[i] + ' = ';
                if (kType[i]) { wherePromoQuery += '"'; }
                wherePromoQuery += params[keys[i]];
                if (kType[i]) { wherePromoQuery += '"'; }
            }
        }

        if (wherePromoQuery != ' WHERE') { selectPromoQuery += wherePromoQuery; }        
        let result = await db.query(selectPromoQuery);

        let promos = [];
        for (let i = 0; i < result.length; i++) {
            promos.push(hFuncs.duplicateObject(result[i], keys));
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Promo Codes Fetched Successfully!",
            promos: promos
        });

    } catch(err) {
        next(err);
    }
}

exports.deletePromo = async (req, res, next) => {
    try {
        let params = req.body;
        await db.query('DELETE FROM promo_code WHERE code = "' + params.code + '"');
        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Promo Code Deleted Successfully",
        })
    } catch(err) {
        next(err);
    }
}
