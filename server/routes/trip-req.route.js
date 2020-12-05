'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var tripReqValidation = require('../validations/trip-req.validation');
var tripReqController = require('../controllers/trip-req.controller');
var jwt = require('../services/jwt');
var { validateUserAccess, validateAdminAccess } = require('../services/access-validator');

// API 5.1: Create Trip Request
router.post(
    '/create',
    validate(tripReqValidation.createTripReq, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    tripReqController.createTripReq
);

// API 5.2: Fetch Trip Requests
router.post(
    '/fetch',
    validate(tripReqValidation.fetchTripReq, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    tripReqController.fetchTripReq
);

// API 5.3: Fetch Customer Trip Requests
router.post(
    '/fetch-customer',
    validate(tripReqValidation.fetchTripReqCustomer, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    tripReqController.fetchTripReqCustomer
);

//API 5.4: Edit Trip Request
router.post(
    '/edit',
    validate(tripReqValidation.editTripReq, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    tripReqController.editTripReq
);


// Export router
module.exports = router;