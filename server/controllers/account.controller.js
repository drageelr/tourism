'use strict'

var db = require('../services/mysql');
var jwt = require('../services/jwt');
var httpStatus = require('../services/http-status');
var customError = require('../errors/errors');
var hFuncs = require('../services/helper-funcs');
var { vars } = require('../config/config');
var emailer = require('../services/nodemailer');

exports.createAdmin = async (req, res, next) => {
    try {
        let params = req.body;

        let pendingAdmin = await db.query('SELECT count(*) FROM admin_request WHERE email = "' + params.email + '"');
        if (pendingAdmin[0]['count(*)']) { throw new customError.DuplicateResourceError("email already used for a potential admin"); }
        let reqAdmin = await db.query('SELECT count(*) FROM admin WHERE email = "' + params.email + '"');
        if (reqAdmin[0]['count(*)']) { throw new customError.DuplicateResourceError("email already used for an admin"); }
        await db.query('INSERT INTO admin_request (email) VALUES ("' + params.email + '")');

        // send email here


        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Potential Admin Created Successfully!"
        });

    } catch(err) {
        next(err);
    }
}

exports.adminSignUp = async (req, res, next) => {
    try {
        let params = req.body;

        let potentialAdmin = await db.query('SELECT email FROM admin_request WHERE id = ' + params.user.id);
        let newAdmin = await db.query(
            'INSERT INTO admin (firstName, lastName, email, password, active) VALUES ("'
            + params.firstName + '", '
            + params.lastName + '", '
            + potentialAdmin[0].email + '", '
            + hFuncs.hash(params.password) + '", true)'
        );
        await db.query(
            'INSERT INTO admin_permission (id, manageAdmins, manageTrips, manageReqList, manageReports) VALUES ('
            + newAdmin.insertId + ', false, false, false, false)'
        );
        await db.query('DELETE FROM admin_request WHERE id = ' + params.user.id);

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Admin Created Successfully!",
            id: newAdmin.insertId
        });

    } catch(err) {
        next(err);
    }
}

exports.customerSignUp = async (req, res, next) => {
    try {
        let params = req.body;

        let reqCustomer = await db.query('SELECT count(*) FROM customer WHERE email = "' + params.email + '"');
        if (reqCustomer[0]['count(*)']) { throw new customError.DuplicateResourceError("email already used for a customer"); }
        let newCustomer = await db.query(
            'INSERT INTO customer (firstName, lastName, email, password, active) VALUES ("'
            + params.firstName + '", '
            + params.lastName + '", '
            + params.email + '", '
            + hFuncs.hash(params.password) + '", true)'
        );

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Customer Created Successfully!",
            id: newCustomer.insertId
        });

    } catch(err) {
        next(err);
    }
}

exports.adminFPReq = async (req, res, next) => {
    try {
        let params = req.body;

        let reqAdmin = await db.query('SELECT id, firstName, lastName FROM admin WHERE email = "' + params.email + '"');
        if (!reqAdmin.length) { throw new customError.NotFoundError("admin not found"); }
        
        // send email here
        let link = vars.secretKey + "password-reset/admin?token=" + jwt.signUser(reqAdmin[0].id, "admin", "12h");
        emailer.sendForgotPasswordEmail(params.email, reqAdmin[0].firstName + " " + reqAdmin[0].lastName, "admin", link);

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Forgot Password Email Sent Successfully!"
        });

    } catch(err) {
        next(err);
    }
}

exports.customerFPReq = async (req, res, next) => {
    try {
        let params = req.body;

        let reqCustomer = await db.query('SELECT id FROM customer WHERE email = "' + params.email + '"');
        if (!reqCustomer.length) { throw new customError.NotFoundError("customer not found"); }
        
        // send email here
        let link = vars.secretKey + "password-reset/customer?token=" + jwt.signUser(reqCustomer[0].id, "customer", "12h");
        emailer.sendForgotPasswordEmail(params.email, reqCustomer[0].firstName + " " + reqCustomer[0].lastName, "customer", link);

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Forgot Password Email Sent Successfully!"
        });

    } catch(err) {
        next(err);
    }
}

exports.adminFPRes = async (req, res, next) => {
    try {
        let params = req.body;

        await db.query('UPDATE admin SET password = "' + hFuncs.hash(params.password) + '" WHERE id = ' + params.user.id);

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Password Reset Successfully!"
        });

    } catch(err) {
        next(err);
    }
}

exports.customerFPRes = async (req, res, next) => {
    try {
        let params = req.body;

        await db.query('UPDATE customer SET password = "' + hFuncs.hash(params.password) + '" WHERE id = ' + params.user.id);

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Password Reset Successfully!"
        });

    } catch(err) {
        next(err);
    }
}