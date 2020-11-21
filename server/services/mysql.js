'use strict'

var mysql = require('mysql');
var util = require('util');
var hFuncs = require('./helper-funcs');

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
}
module.exports.defaultAdmin = async () => {
    let query = util.promisify(con.query).bind(con);

    let adminCount = await query("SELECT count(*) FROM admin");

    if (adminCount[0]['count(*)']) { return; }

    let result = await query('INSERT INTO admin (firstName, lastName, email, password, active) VALUES ("Admin", "Test", "admin@tourism.app2020.com", "' + hFuncs.hash("Test12345") + '", true)');
    await query('INSERT INTO admin_permission VALUES (' + result.insertId + ', true, true, true, true)');
    console.log("Default Admin Created: admin@tourism.app2020.com Test12345");
}