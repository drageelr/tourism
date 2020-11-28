'use strict'

// Dependancies
var Joi = require('@hapi/joi');

exports.createTrip = { 
    body : Joi.object({
        name: Joi.string().max(50).required(),
        description: Joi.string().max(100).required(),
        itienrary: Joi.string().max(100).required(),
        price: Joi.number().required(),
        capacity: Joi.number().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        locationIDs: Joi.array().items(Joi.number()).required()
    })

}

exports.fetchTrip = {
    body : Joi.object({
        id: Joi.number(),
        name: Joi.string().max(50),
        description: Joi.string().max(100),
        itienrary: Joi.string().max(100),
        price: Joi.number(),
        capacity: Joi.number(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        locationIDs: Joi.array().items(Joi.number())
    })
}
exports.editTrip = { 
    body : Joi.object({
        id: Joi.number().required(),
        name: Joi.string().max(50),
        description: Joi.string().max(100),
        itienrary: Joi.string().max(100),
        price: Joi.number(),
        capacity: Joi.number(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        locationIDs: Joi.array().items(Joi.number())
    })
}