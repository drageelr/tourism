'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 3.1:
exports.createLocation = {
    body: Joi.object({
        site: Joi.string().max(50).required(),
        city: Joi.string().max(50).required(),
        province: Joi.string().max(50).required()
    })
};

// API 3.2:
exports.fetchLocation = {
    body: Joi.object({
        id: Joi.number(),
        site: Joi.string().max(50),
        city: Joi.string().max(50),
        province: Joi.string().max(50)
    })
};