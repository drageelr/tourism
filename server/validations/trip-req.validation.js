'use strict'

// Dependancies
var Joi = require('@hapi/joi');

// API 5.1:
exports.createTripReq = {
    body: Joi.object({
        tripID: Joi.number().required(),
        code: Joi.string().max(10),
        numberOfPeople: Joi.number().required()
    })
};

// API 5.2:
exports.fetchTripReq = {
    body: Joi.object({
        id: Joi.number(),
        tripID: Joi.number(),
        customerID: Joi.number(),
        code: Joi.string().max(10),
        numberOfPeople: Joi.number(),
        amountDue: Joi.number(),
        accepted: Joi.bool()
    })
};

// API 5.3:
exports.fetchTripReqCustomer = {
    body: Joi.object({
        id: Joi.number(),
        tripID: Joi.number(),
        code: Joi.string().max(10),
        numberOfPeople: Joi.number(),
        amountDue: Joi.number(),
        accepted: Joi.bool()
    })
};

// API 5.4:
exports.editTripReq = {
    body: Joi.object({
        id: Joi.number().required(),
        numberOfPeople: Joi.number(),
        amountDue: Joi.number(),
        accepted: Joi.bool()
    })
};