var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('DELETE DATABASE ' + dbconfig.database);
console.log("DB CLEANED");
connection.end();