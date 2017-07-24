var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');


connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.housing_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `housingname` VARCHAR(20) NOT NULL, \
    `description` VARCHAR(160) NOT NULL, \
    `address` VARCHAR(160) NOT NULL, \
    `contact` VARCHAR(160) NOT NULL, \
    `price` VARCHAR(20) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `housingname_UNIQUE` (`housingname` ASC) \
)');

console.log('Success: Database Created!')

connection.end();
