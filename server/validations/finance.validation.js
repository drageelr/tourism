'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 7.1:
exports.fetchMonthlyStatement = {
    body: Joi.object({
        month: Joi.number().integer().min(0).max(11).required(),
        year: Joi.number().integer().min(1970).required()
    })
};

// API 7.2:
exports.fetchYearlyStatement = {
    body: Joi.object({
        year: Joi.number().integer().min(1970).required()
    })
};