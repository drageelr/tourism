'use strict'

var router = require('express').Router();
var validate = require('express-validation').validate;
var authValidation = require('../validations/auth.validation');
var authController = require('../controllers/auth.controller');

// API 1.1: Admin Login:
router.post(
    '/admin/login',
    validate(authValidation.login, {keyByField: true}),
    authController.adminLogin
);
  
// API 1.2: Customer Login:
router.post(
    '/customer/login', 
    validate(authValidation.login, {keyByField: true}),
    authController.customerLogin
);

// Export router
module.exports = router;