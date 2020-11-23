'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 2.1 & 2.8 & 2.9:
exports.email = {
    body: Joi.object({
        email: Joi.string().email().max(50).required()
    })
};

// API 2.2:
exports.adminSignUp = {
    body: Joi.object({
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30).required(),
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required()
    })
};

// API 2.3:
exports.customerSignUp = {
    body: Joi.object({
        email: Joi.string().email().max(50).required(),
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30).required(),
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required()
    })
};

// API 2.4:
exports.fetchAdmins = {
    body: Joi.object({
        id: Joi.number(),
        email: Joi.string().email().max(50),
        firstName: Joi.string().max(50),
        lastName: Joi.string().max(50),
        active: Joi.bool(),
        permission: Joi.object({
            manageAdmins: Joi.bool(),
            manageTrips: Joi.bool(),
            manageReqList: Joi.bool(),
            manageReports: Joi.bool()
        })
    })
}

// API 2.5:
exports.fetchCustomers = {
    body: Joi.object({
        id: Joi.number(),
        email: Joi.string().email().max(50),
        firstName: Joi.string().max(50),
        lastName: Joi.string().max(50),
        active: Joi.bool()
    })
}

// API 2.6:
exports.editAdmin = {
    body: Joi.object({
        id: Joi.number().required(),
        email: Joi.string().email().max(50),
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30),
        firstName: Joi.string().max(50),
        lastName: Joi.string().max(50),
        active: Joi.bool(),
        permission: Joi.object({
            manageAdmins: Joi.bool(),
            manageTrips: Joi.bool(),
            manageReqList: Joi.bool(),
            manageReports: Joi.bool()
        })
    })
}

// API 2.7:
exports.editCustomer = {
    body: Joi.object({
        id: Joi.number().required(),
        email: Joi.string().email().max(50),
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30),
        firstName: Joi.string().max(50),
        lastName: Joi.string().max(50),
        active: Joi.bool()
    })
}

// API 2.10 & 2.11:
exports.password = {
    body: Joi.object({
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30).required()
    })
};

// API 2.12 & 2.13:
exports.changePassword = {
    body: Joi.object({
        oldPassword: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30).required(),
        newPassword: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30).required()
    })
};
