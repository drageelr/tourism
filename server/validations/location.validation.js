'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 3.1:
exports.createLocation = {
    body: Joi.object({
       site: Joi.string().required(),
       city: Joi.string().required(),
       province: Joi.string().required()
    })
};