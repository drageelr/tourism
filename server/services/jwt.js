'use strict'

var jwt = require('jsonwebtoken');
var db = require('../services/mysql');
var customError = require('../errors/errors');
var { vars } = require('../config/config');

exports.signUser = (id, type, expiry = '12h') => {
    return jwt.sign({id: id, type: type}, vars.secretKey, {expiresIn: expiry});
}

function decodeToken(token) {
    try {
        return jwt.verify(token, vars.secretKey);
    } catch(e) {
        return {err: e};
    }
}

exports.verfiyUser = async (req, res, next) => {
    try {
        let token = req.get("Authorization");
        if (token) {
            token = token.substring(7);
        } else {
            throw new customError.ForbiddenAccessError("no token given");
        }

        let decodedObj = decodeToken(token);
        if(decodedObj.err) throw new customError.ForbiddenAccessError("invalid token");

        let reqUser = await db.query("SELECT * FROM " + decodedObj.type + " WHERE id = " + decodedObj.id);
        if (reqUser.length) {
            req.body.user = decodedObj;
            next();
        } else {
            throw new customError.ForbiddenAccessError("invalid token");
        }

    } catch(e) {
        next(e);
    }
}