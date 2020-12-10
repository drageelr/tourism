'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');

exports.adminLogin = async (req, res, next) => {
    
    try {
        let params = req.body;
        let reqUser = await db.query('SELECT * FROM admin WHERE email = "' + params.email + '" AND password = "' + hFuncs.hash(params.password) + '"');
        if (!reqUser.length) { throw new customError.AuthenticationError("invalid credentials"); }
        if (!reqUser[0].active) { throw new customError.AuthenticationError("account not active"); }

        let token = jwt.signUser(reqUser[0].id, "admin");

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Login Sucessful!",
            token: token,
            user: {
                id: reqUser[0].id,
                firstName: reqUser[0].firstName,
                lastName: reqUser[0].lastName,
            }
        });
    } catch(err) {
        next(err);
    }
}

exports.customerLogin = async (req, res, next) => {
    try {
        let params = req.body;

        let reqUser = await db.query('SELECT * FROM customer WHERE email = "' + params.email + '" AND password = "' + hFuncs.hash(params.password) + '"');
        if (!reqUser.length) { throw new customError.AuthenticationError("invalid credentials"); }
        if (!reqUser[0].active) { throw new customError.AuthenticationError("account not active"); }

        let token = jwt.signUser(reqUser[0].id, "customer");

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Login Sucessful!",
            token: token,
            user: {
                id: reqUser[0].id,
                firstName: reqUser[0].firstName,
                lastName: reqUser[0].lastName,
            }
        });
    } catch(err) {
        next(err);
    }
}