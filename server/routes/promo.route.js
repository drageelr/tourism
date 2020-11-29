'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var jwt = require('../services/jwt');
var { validateUserAccess, validateAdminAccess } = require('../services/access-validator');
var promoValidation = require('../validations/promo.validation');
var promoController = require('../controllers/promo.controller');

// API 6.1: Create Promo Code
router.post (
    '/create',
    validate(promoValidation.createPromocode, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    promoController.createPromo

);

// API 6.2: Fetch Promo Code
router.post (
    '/fetch',
    validate(promoValidation.fetchPromocode, {keyByField: true}),
    promoController.fetchPromo
);

// API 6.3: Delete Promo Code
router.post (
    '/delete',
    validate(promoValidation.deletePromocode, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    promoController.deletePromo

);

// Export router
module.exports = router;

