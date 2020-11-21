'use strict'

var db = require('../services/mysql');
var customError = require('../errors/errors');

const userAccess = {
  // 2. Account Management API "account.route.js":
  "/api/account/admin/create": "admin",
  "/api/account/admin/signup": "admin_request",
  "/api/account/admin/fetch": "admin",
  "/api/account/customer/fetch": "admin",
  "/api/account/admin/edit": "admin",
  "/api/account/customer/edit": "admin",
  "/api/account/admin/forgot-password/res": "admin",
  "/api/account/customer/forgot-password/res": "customer",
  "/api/account/admin/change-password": "admin",
  "/api/account/customer/change-password": "customer",

  // 3. Location Management API "location.route.js":
  "/api/location/create": "admin",

  // 4. Trip Management API "trip.route.js":
  "/api/trip/create": "admin",
  "/api/trip/edit": "admin",

  // 5. Trip Request Management API "trip-req.route.js"
  "/api/trip-req/create": "customer",
  "/api/trip-req/fetch": "admin",
  "/api/trip-req/fetch-customer": "customer",
  "/api/trip-req/edit": "admin",

  // 6. Promo Code Management API "promo.route.js"
  "/api/code/create": "admin",
  "/api/code/fetch": "admin",
  "/api/code/delete": "admin",

  // 7. Finance Management API "finance.route.js"
  "/api/finance/monthly": "admin",
  "/api/finance/yearly": "admin",
};

const adminAccess = {
  // 2. Account Management API "account.route.js":
  "/api/account/admin/create": "manageAdmins",
  "/api/account/admin/edit": "manageAdmins",
  "/api/account/customer/edit": "manageAdmins",
  
  // 3. Location Management API "location.route.js":
  "/api/location/create": "manageTrips",

  // 4. Trip Management API "trip.route.js":
  "/api/trip/create": "manageTrips",
  "/api/trip/edit": "manageTrips",

  // 5. Trip Request Management API "trip-req.route.js"
  "/api/trip-req/fetch": "manageReqList",
  "/api/trip-req/edit": "manageReqList",

  // 6. Promo Code Management API "promo.route.js"
  "/api/code/create": "manageReqList",
  "/api/code/delete": "manageReqList",

  // 7. Finance Management API "finance.route.js"
  "/api/finance/monthly": "manageReports",
  "/api/finance/yearly": "manageReports",
};

/**
 * Validates access of users and return an error if
 * a forbidden resource is being accessed.
 */
exports.validateUserAccess = (req, res, next) => {
  try {
    let accessList = userAccess[req.originalUrl];
    if (accessList) {
      let accessGranted = false;
    
      if (accessList == req.body.user.type) {
          accessGranted = true;
      }

      if (accessGranted) {
        next();
      } else {
        throw new customError.ForbiddenAccessError("Forbidden access to resource.");
      }
    } else {
      next();
    }
  } catch (err) {
    next(err)
  }
}

/**
 * Validates access of CCA users based on their permissions
 * and returns if a forbidden resource is being accessed. 
 */
exports.validateAdminAccess = async (req, res, next) => {
  try {
    let accessList = adminAccess[req.originalUrl];
    if (!accessList) { next(); }

    if (req.body.user.type != "admin") { throw new customError.ForbiddenAccessError("user of this type is not allowed to access this resource"); }

    let reqAdminPermission = await db.query('SELECT * FROM admin_permission WHERE id = ' + req.body.user.id);

    if (!reqAdminPermission.length) { throw new customError.ForbiddenAccessError("no permissions found for this admin"); }

    if (!reqAdminPermission[0][accessList]) { throw new customError.ForbiddenAccessError("admin does not have permission to access this resource"); }
  
    next();
  } catch (err) {
    next(err);
  }
}