const mysql = require("mysql");

const { db } = require("./config");

module.exports.database = mysql.createPool(db);
