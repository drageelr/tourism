'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 1.1 & 1.2:
exports.login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]/).min(8).max(30).required()
    })
};