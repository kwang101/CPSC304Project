const connection = require('./config/connection');
const async = require('async');

async.waterfall([
    function (callback) {
        connection.query(
            `CREATE TABLE Date (
                startTime TIME DEFAULT '00:00:01',
                endTime TIME DEFAULT '00:00:01',
                dayOfWeek REAL,
                PRIMARY KEY(startTime, endTime, dayOfWeek)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE TABLE Program (
                programType ENUM('class', 'dropin', 'intramural') NOT NULL,
                term REAL,
                price FLOAT,
                name VARCHAR(100),
                programId INTEGER,
                PRIMARY KEY(programId)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE TABLE Occurs (
                startTime TIME DEFAULT '00:00:01',
                endTime TIME DEFAULT '00:00:01',
                dayOfWeek REAL,
                programId INTEGER,
                PRIMARY KEY(startTime, endTime, dayOfWeek, programId),
                FOREIGN KEY (startTime, endTime, dayOfWeek) REFERENCES Date(startTime, endTime, dayOfWeek)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                FOREIGN KEY (programId) REFERENCES Program(programId)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE TABLE User (
                isAdmin BOOL NOT NULL DEFAULT 0,
                isInstructor BOOL NOT NULL DEFAULT 0,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE NOT NULL,
                userId INTEGER AUTO_INCREMENT,
                isUBC BOOL,
                creditCard LONG,
                expiryDate TIMESTAMP,
                passwordHash CHAR(64),
                PRIMARY KEY(userId)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE TABLE Location (
                capacity INTEGER,
                name VARCHAR(30),
                address VARCHAR(100),
                PRIMARY KEY(name, address)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE TABLE IsLocated (
                name VARCHAR(30),
                address VARCHAR(100),
                programId INTEGER,
                PRIMARY KEY(name, address, programId),
                FOREIGN KEY(name, address) REFERENCES Location(name, address)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                FOREIGN KEY (programId) REFERENCES Program(programId)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE TABLE TeachesClass (
                programId INTEGER,
                userId INTEGER,
                PRIMARY KEY(programId, userId),
                FOREIGN KEY (programId) REFERENCES Program (programId)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                FOREIGN KEY (userId) REFERENCES User (userId)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE TABLE Registers (
                transactionId INTEGER,
                isPaid BOOL,
                fees FLOAT,
                programId INTEGER,
                userId INTEGER,
                FOREIGN KEY (programId) REFERENCES Program (programId)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
                FOREIGN KEY (userId) REFERENCES User (userId)
                ON DELETE CASCADE
                ON UPDATE CASCADE
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `
            CREATE VIEW classes AS
            SELECT * FROM Program p
            WHERE p.programType = "class";
            `,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `CREATE VIEW programcapacity AS
            SELECT programType, p.programId, capacity
            FROM Program p, IsLocated i, Location l
            WHERE p.programId = i.programId AND i.name = l.name
            `,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `GRANT ALL PRIVILEGES ON okep5tr7f8lcolsi.* TO 'g89pjlxdyo776ioi'@'ec2-54-162-22-235.compute-1.amazonaws.com' WITH GRANT OPTION;
            `,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    }

], function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Tables have been created');
    require('./seed-db.js')();
});

// mysql --user=g89pjlxdyo776ioi --password=ok8pai8mvwqhn5ck --host=sulnwdk5uwjw1r2k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com okep5tr7f8lcolsi