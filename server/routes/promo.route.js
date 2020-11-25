'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var jwt = require('../services/jwt');
var { validateUserAccess, validateAdminAccess } = require('../services/access-validator');
var promoValidation = require('../validations/promo.validation');
var promoController = require('../controllers/promo.controller');

// API 6.1: Create Promo code
router.post (
    '/create',
    validate(promoValidation.createPromocode, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    promoController.createPromo

);

// Export router
module.exports = router;

