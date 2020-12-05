'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var financeValidation = require('../validations/finance.validation');
var financeController = require('../controllers/finance.controller');
var jwt = require('../services/jwt');
var { validateUserAccess, validateAdminAccess } = require('../services/access-validator');

// API 7.1: Fetch Monthly Statement
router.post(
    '/monthly',
    validate(financeValidation.fetchMonthlyStatement, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    financeController.fetchMonthlyStatement
);

// API 7.2: Fetch Yearly Statement
router.post(
    '/yearly',
    validate(financeValidation.fetchYearlyStatement, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    financeController.fetchYearlyStatement
);

// Export router
module.exports = router;