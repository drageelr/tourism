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

// API 2.4: Fetch Admins
router.post(
    '/admin/fetch',
    validate(accountValidation.fetchAdmins, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    accountController.fetchAdmins
);

// API 2.5: Fetch Customers
router.post(
    '/customer/fetch',
    validate(accountValidation.fetchCustomers, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    accountController.fetchCustomers
);

// API 2.6: Edit Admin
router.post(
    '/admin/edit',
    validate(accountValidation.editAdmin, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    accountController.editAdmin
);

// API 2.5: Edit Customer
router.post(
    '/customer/edit',
    validate(accountValidation.editCustomer, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    validateAdminAccess,
    accountController.editCustomer
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

// API 2.12: Admin Change Password
router.post(
    '/admin/change-password',
    validate(accountValidation.changePassword, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    accountController.adminChangePassword
);

// API 2.13: Customer Change Password
router.post(
    '/customer/change-password',
    validate(accountValidation.changePassword, {keyByField: true}),
    jwt.verfiyUser,
    validateUserAccess,
    accountController.customerChangePassword
);

// Export router
module.exports = router;