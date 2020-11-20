'use strict'

var crypto = require('crypto');

exports.hash = (str) => {
    return crypto.createHash('sha256').update(str).digest('base64');
}