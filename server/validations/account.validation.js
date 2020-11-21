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

// API 2.10 & 2.11:
exports.password = {
    body: Joi.object({
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30).required()
    })
};
