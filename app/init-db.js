const connection = require('./config/connection');
const async = require('async');

async.waterfall([
    function(callback) {
        connection.query(
            `CREATE TABLE Date (
                startTime TIMESTAMP DEFAULT '1970-01-01 00:00:01',
                endTime TIMESTAMP DEFAULT '1970-01-01 00:00:01',
                dayOfWeek REAL,
                PRIMARY KEY(startTime, endTime, dayOfWeek)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE Occurs (
                startTime TIMESTAMP DEFAULT '1970-01-01 00:00:01',
                endTime TIMESTAMP DEFAULT '1970-01-01 00:00:01',
                dayOfWeek REAL,
                programId INTEGER,
                PRIMARY KEY(startTime, endTime, dayOfWeek, programId)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE Program (
                programType ENUM('class', 'dropin', 'intramural') NOT NULL,
                term REAL,
                price FLOAT,
                name VARCHAR(100),
                programId INTEGER,
                PRIMARY KEY(programId)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE User (
                isAdmin BOOL,
                name VARCHAR(100),
                userId INTEGER,
                isUBC BOOL,
                creditCard LONG,
                expiryDate TIMESTAMP,
                passwordHash CHAR(64),
                PRIMARY KEY(userId)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE UserSession (
                userId INTEGER,
                expiryDate TIMESTAMP,
                PRIMARY KEY(userId, expiryDate),
                FOREIGN KEY (userId) REFERENCES User(userId)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE Location (
                capacity INTEGER,
                name VARCHAR(30),
                address VARCHAR(100),
                PRIMARY KEY(name, address)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE IsLocated (
                name VARCHAR(30),
                address VARCHAR(100),
                programId INTEGER,
                PRIMARY KEY(name, address, programId),
                FOREIGN KEY(name, address) REFERENCES Location(name, address),
                FOREIGN KEY (programId) REFERENCES Program(programId)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE TeachesClass (
                programId INTEGER,
                userId INTEGER,
                PRIMARY KEY(programId, userId),
                FOREIGN KEY (programId) REFERENCES Program (programId),
                FOREIGN KEY (userId) REFERENCES User (userId)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function(callback) {
        connection.query(
            `CREATE TABLE Registers (
                transactionId INTEGER,
                isPaid BOOL,
                fees FLOAT,
                programId INTEGER,
                userId INTEGER,
                FOREIGN KEY (programId) REFERENCES Program (programId),
                FOREIGN KEY (userId) REFERENCES User (userId)
            )`,
            function(err, result){
                if(err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    }
], function (err, result) {
    if(err){
        console.error(err);
        return;
    }
    console.log('Database Tables have been created');
    require('./seed-db.js')();
});