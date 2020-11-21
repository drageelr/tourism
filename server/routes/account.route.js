'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var jwt = require('../services/jwt');
var { validateUserAccess, validateAdminAccess } = require('../services/access-validator');
var accountValidation = require('../validations/account.validation');
var accountController = require('../controllers/account.controller');

// API 2.1: Create Admin
router.post(
    '/admin/create',
    validate(accountValidation.email, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    accountController.createAdmin
);

// API 2.2: Admin Sign Up
router.post(
    '/admin/create',
    validate(accountValidation.adminSignUp, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    accountController.adminSignUp
);

// API 2.3: Customer Sign Up
router.post(
    '/admin/create',
    validate(accountValidation.customerSignUp, {keyByField: true}),
    accountController.customerSignUp
);

// API 2.8: Admin Forgot Password Request
router.post(
    '/admin/forgot-password/req',
    validate(accountValidation.email, {keyByField: true}),
    accountController.adminFPReq
);

// API 2.9: Customer Forgot Password Request
router.post(
    '/customer/forgot-password/req',
    validate(accountValidation.email, {keyByField: true}),
    accountController.customerFPReq
);

// API 2.10: Admin Forgot Password Reset
router.post(
    '/admin/forgot-password/res',
    validate(accountValidation.password, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    accountController.adminFPRes
);

// API 2.11: Customer Forgot Password Reset
router.post(
    '/customer/forgot-password/res',
    validate(accountValidation.password, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    accountController.customerFPRes
);

// Export router
module.exports = router;