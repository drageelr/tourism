'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var jwt = require('../services/jwt');
var { validateUserAccess, validateAdminAccess } = require('../services/access-validator');
var locationValidation = require('../validations/location.validation');
var locationController = require('../controllers/location.controller');

// API 3.1: Create Location:
router.post(
    '/create',
    validate(locationValidation.createLocation, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    locationController.createLocation
);

// API 3.1: Fetch Location:
router.post(
    '/fetch',
    validate(locationValidation.fetchLocation, {keyByField: true}),
    locationController.fetchLocation
);

// Export router
module.exports = router;