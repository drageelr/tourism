'use strict'

var mysql = require('mysql');
var util = require('util');

var con = mysql.createConnection({
    host: "localhost",
    user: "tourism",
    password: "tourism123",
    database: "tourism_db"
});

con.on('connect', (err) => {
    if (err) throw err;
    console.log("MYSQL DB Connected!");
    
})

module.exports.con = con;
module.exports.query = async (q) => {
    let query = util.promisify(con.query).bind(con);
    let result = await query(q);
    return result;
} ;