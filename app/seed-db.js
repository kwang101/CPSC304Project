const connection = require('../config/connection');

connection.query(`
    CREATE TABLE Date (
        startTime TIMESTAMP,
        endTime TIMESTAMP,
        dayOfWeek REAL,
        PRIMARY KEY(startTime, endTime, dayOfWeek)
    );
    
    CREATE TABLE Occurs (
        startTime TIMESTAMP,
        endTime TIMESTAMP,
        dayOfWeek REAL,
        programId INTEGER,
        PRIMARY KEY(startTime, endTime, dayOfWeek, program_id)
    );
    
    CREATE TABLE Program (
        programType ENUM,
        ('class', 'dropin', 'intramural') NOT NULL,
        term REAL,
        price FLOAT,
        name VARCHAR(100),
        programId INTEGER PRIMARY KEY(programId)
    );
    
    CREATE TABLE User (
        isAdmin BOOL,
        name VARCHAR(100),
        userId INTEGER,
        isUBC BOOL,
        creditCard LONG,
        expiryDate TIMESTAMP,
        PRIMARY KEY(userId)
    );
    
    CREATE TABLE UserSession (
        userId INTEGER,
        expiryDate TIMESTAMP,
        PRIMARY KEY(userId, expiryDate)
        FOREIGN KEY userId REFERENCES User
    );
    
    CREATE TABLE Location (
        capacity INTEGER,
        name VARCHAR(30),
        address VARCHAR(100),
        PRIMARY KEY(name, address)
    )
    ;
    CREATE TABLE IsLocated (
        name VARCHAR(30),
        address VARCHAR(100),
        programId INTEGER,
        PRIMARY KEY(name, address, programId),
        FOREIGN KEY(name, address) REFERENCES Location,
        FOREIGN KEY programId REFERENCES Program
    );
    
    CREATE TABLE TeachesClass (
        programId INTEGER,
        userId INTEGER,
        PRIMARY KEY(programId, userId)
    FOREIGN KEY programId REFERENCES Program,
        FOREIGN KEY userId REFERENCES User
    );
    
    CREATE TABLE Registers (
        transactionId INTEGER,
        isPaid BOOL,
        fees FLOAT,
        programId INTEGER,
        userId INTEGER,
        FOREIGN KEY programId REFERENCES Program,
        FOREIGN KEY userId REFERENCES User
    );`,
function(err)){};