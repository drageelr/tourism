'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 6.1:
exports.createPromocode = {
    body: Joi.object({
        code: Joi.string().max(10).required(),
        maxDiscount: Joi.number().required(),
        discountPercentage: Joi.number().required()
    })
};

// API 6.2:
exports.fetchPromocode = {
    body: Joi.object({
        code: Joi.string().max(10),
        maxDiscount: Joi.number(),
        discountPercentage: Joi.number()
    })
};

// API 6.3:
exports.deletePromocode = {
    body: Joi.object({
        code: Joi.string().max(10).required()
    })
};