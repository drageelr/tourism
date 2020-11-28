'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var tripValidation = require('../validations/trip.validation');
var tripController = require('../controllers/trip.controller');
var jwt = require('../services/jwt');
var { validateUserAccess, validateAdminAccess } = require('../services/access-validator');

// API 4.1: Create Trip:
router.post(
    '/create',
    validate(tripValidation.createTrip, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    tripController.createTrip
);

//API 4.3: Edit Trip
router.post(
    '/edit',
    validate(tripValidation.editTrip, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    tripController.editTrip
);

//API 4.2: Fetch Trip
router.post(
    '/fetch',
    validate(tripValidation.fetchTrip, {keyByField: true}),
    tripController.fetchTrip
)

// Export router
module.exports = router;
