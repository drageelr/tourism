'use strict'

// Dependancies
var Joi = require('@hapi/joi');

exports.createPromocode = {
    body: Joi.object({
        code: Joi.string().required(),
        maxDiscount: Joi.number().required(),
        discountPercentage:Joi.number().required()
    })
};

exports.deletePromocode = {
    body: Joi.object({
        code : Joi.number().required()
    })
};