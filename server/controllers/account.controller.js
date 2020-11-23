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
        let newPotentialAdmin = await db.query('INSERT INTO admin_request (email) VALUES ("' + params.email + '")');

        // send email here
        let link = vars.secretKey + "signup/admin?token=" + jwt.signUser(newPotentialAdmin.insertId, "admin_request", "8760h");
        emailer.sendAdminSignUpEmail(params.email, link);

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

exports.fetchAdmins = async (req, res, next) => {
    try {
        const keysPermission = ["manageAdmins", "manageTrips", "manageReqList", "manageReports"];
        const keys = ["id", "email", "firstName", "lastName", "active"];
        const kType = [0, 1, 1, 1, 0];
        let params = req.body;

        let selectQueryPermission = 'SELECT id FROM admin_permission';
        let whereQueryPermission = ' WHERE';
        for (let i = 0; i < keysPermission.length; i++) {
            if (params[keysPermission[i]] !== undefined) {
                if (whereQueryPermission != ' WHERE') { whereQueryPermission += ' AND'; }
                whereQueryPermission += ' ' + keysPermission[i] + ' = ' + params[keysPermission[i]];
            }
        }

        let selectQuery = 'SELECT * FROM customer';
        let whereQuery = ' WHERE';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (whereQuery != ' WHERE') { whereQuery += ' AND'; }
                whereQuery += ' ' + keys[i] + ' = '
                if (kType[i]) { whereQuery += '"'; }
                whereQuery += params[keys[i]]
                if (kType[i]) { whereQuery += '"'; }
            }
        }

        let appendAnd = false;

        if (whereQuery != ' WHERE') {
            selectQuery += whereQuery;
            appendAnd = true;
        }

        if (whereQueryPermission != ' WHERE') {
            let appendStr = ' WHERE id IN (';
            if (appendAnd) { appendStr = ' AND id IN ('; }
            selectQuery += appendStr + selectQueryPermission + whereQueryPermission + ')';
        }

        let results = await db.query(selectQuery + ' ORDER BY id ASC');

        let adminArray = [];
        let ids = "0";
        for (let i = 0; i < results.length; i++) {
            adminArray.push(hFuncs.duplicateObject(results[i], keys));
            ids += ', ' + results[i].id;
        }

        if (adminArray.length) {
            let resultsPermission = await db.query('SELECT manageAdmins, manageTrips, manageReqList, manageReports FROM admin_permission WHERE id IN (' + ids + ') ORDER BY id ASC');
            for (let i = 0; i < adminArray.length; i++) {
                adminArray[i].permission = hFuncs.duplicateObject(resultsPermission[i], keysPermission);
            }
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Admins Fetched Successfully!",
            admins: adminArray
        });
        
    } catch (err) {
        next(err);
    }
}

exports.fetchCustomers = async (req, res, next) => {
    try {
        const keys = ["id", "email", "firstName", "lastName", "active"];
        const kType = [0, 1, 1, 1, 0];
        let params = req.body;

        let selectQuery = 'SELECT * FROM customer';
        let whereQuery = ' WHERE';
        for (let i = 0; i < keys.length; i++) {
            if (params[keys[i]] !== undefined) {
                if (whereQuery != ' WHERE') { whereQuery += ' AND'; }
                whereQuery += ' ' + keys[i] + ' = '
                if (kType[i]) { whereQuery += '"'; }
                whereQuery += params[keys[i]]
                if (kType[i]) { whereQuery += '"'; }
            }
        }

        if (whereQuery != ' WHERE') {
            selectQuery += whereQuery;
        }

        let results = await db.query(selectQuery);

        let customerArray = [];
        for (let i = 0; i < results.length; i++) {
            customerArray.push(hFuncs.duplicateObject(results[i], keys));
        }

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Customers Fetched Sucessfully!",
            customers: customerArray
        })

    } catch (err) {
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

exports.adminChangePassword = async (req, res, next) => {
    try {
        let params = req.body;

        let reqAdmin = await db.query('SELECT password FROM admin WHERE id = ' + params.user.id + ' AND password = "' + hFuncs.hash(params.oldPassword) + '"');
        if (!reqAdmin.length) { throw new customError.AuthenticationError("invalid old password"); }
        await db.query('UPDATE admin SET password = "' + hFuncs.hash(params.newPassword) + '" WHERE id = ' + params.user.id);

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Password Changed Successfully!"
        })
    } catch(err) {
        next(err);
    }
}

exports.customerChangePassword = async (req, res, next) => {
    try {
        let params = req.body;

        let reqCustomer = await db.query('SELECT password FROM customer WHERE id = ' + params.user.id + ' AND password = "' + hFuncs.hash(params.oldPassword) + '"');
        if (!reqCustomer.length) { throw new customError.AuthenticationError("invalid old password"); }
        await db.query('UPDATE customer SET password = "' + hFuncs.hash(params.newPassword) + '" WHERE id = ' + params.user.id);

        res.json({
            statusCode: 200,
            statusName: httpStatus.getName(200),
            message: "Password Changed Successfully!"
        })
    } catch(err) {
        next(err);
    }
}