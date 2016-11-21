module.exports = function () {
    var salt = '$2a$10$wENMOiXaNvkXN9BmCbh4ZO';
    const connection = require('./config/connection');
    const async = require('async');
    const bcrypt = require('bcryptjs');

    async.waterfall([
        function (callback) {
            connection.query(
                `
                INSERT INTO Date VALUES ('11:00:00', '12:00:00', 3);
                INSERT INTO Date VALUES ('11:00:00', '12:00:00', 4);
                INSERT INTO Date VALUES ('11:00:00', '12:00:00', 5);
                INSERT INTO Date VALUES ('11:00:00', '12:00:00', 6);
                INSERT INTO Date VALUES ('11:00:00', '12:00:00', 7);
                INSERT INTO Date VALUES ('19:00:00', '20:00:00', 1);
                INSERT INTO Date VALUES ('20:00:00', '21:00:00', 1);
                INSERT INTO Date VALUES ('23:00:00', '24:00:00', 5);
                INSERT INTO Date VALUES ('19:00:00', '20:00:00', 2);
                INSERT INTO Date VALUES ('20:00:00', '21:00:00', 2);
                INSERT INTO Date VALUES ('19:00:00', '20:00:00', 3);
                INSERT INTO Date VALUES ('20:00:00', '21:00:00', 3);
                INSERT INTO Date VALUES ('19:00:00', '20:00:00', 4);
                INSERT INTO Date VALUES ('20:00:00', '21:00:00', 4);
                INSERT INTO Date VALUES ('21:00:00', '22:00:00', 4);
                INSERT INTO Date VALUES ('09:00:00', '10:00:00', 6);
                INSERT INTO Date VALUES ('10:00:00', '22:00:00', 6);
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                INSERT INTO Program VALUES ('class', 2, 20.00, 'Yoga', 000132);
                INSERT INTO Program VALUES ('class', 2, 50.00, 'Twerking', 000134);
                INSERT INTO Program VALUES ('class', 1, 15.00, 'Pilates', 000135);
                INSERT INTO Program VALUES ('class', 2, 20.00, 'BootCamp', 000137);
                INSERT INTO Program VALUES ('class', 1, 15.00, 'Meme-ing', 000133);
                INSERT INTO Program VALUES ('class', 1, 15.00, 'Wrestling', 000136);
                INSERT INTO Program VALUES ('dropin', 1, 10.00, 'Basketball Drop-in', 000140);
                INSERT INTO Program VALUES ('dropin', 1, 10.00, 'Volleyball Drop-in', 000141);
                INSERT INTO Program VALUES ('intramural', 1, 0.00, 'Volleyball Intramural Tier 2', 000152);
                INSERT INTO Program VALUES ('intramural', 2, 10.00, 'Volleyball Intramural Tier 1', 000153);
                INSERT INTO Program VALUES ('intramural', 1, 5.00, 'Basketball Intramural Tier 2', 000154);
                INSERT INTO Program VALUES ('intramural', 2, 10.00, 'Basketball Intramural Tier 1', 000155);
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                INSERT INTO Occurs VALUES ('19:00:00', '20:00:00', 1, 000132);
                INSERT INTO Occurs VALUES ('20:00:00', '21:00:00', 1, 000133);
                INSERT INTO Occurs VALUES ('23:00:00', '24:00:00', 5, 000134);
                INSERT INTO Occurs VALUES ('19:00:00', '20:00:00', 2, 000135);
                INSERT INTO Occurs VALUES ('20:00:00', '21:00:00', 2, 000136);
                INSERT INTO Occurs VALUES ('19:00:00', '20:00:00', 3, 000137);
                INSERT INTO Occurs VALUES ('20:00:00', '21:00:00', 3, 000140);
                INSERT INTO Occurs VALUES ('19:00:00', '20:00:00', 4, 000141);
                INSERT INTO Occurs VALUES ('20:00:00', '21:00:00', 4, 000152);
                INSERT INTO Occurs VALUES ('21:00:00', '22:00:00', 4, 000153);
                INSERT INTO Occurs VALUES ('09:00:00', '10:00:00', 6, 000154);
                INSERT INTO Occurs VALUES ('10:00:00', '22:00:00', 6, 000155);
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            const password = bcrypt.hashSync('password', salt);
            connection.query(
                `
                INSERT INTO User VALUES (true, true, 'Edward Zhou', 'edwardzhou@cs.ubc.ca', 12345678, true, 4432013293128423, '2018-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, false, 'Mike Feeley', 'mike@cs.ubc.ca', 12341133, true, 9877123487652342, '2020-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, true, 'Steve Wolfman', 'steve@cs.ubc.ca', 23452344, true, 1234267842641234, '2020-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, true, 'Gregor Kiczales', 'gregor@cs.ubc.ca', 09289345, true, 9472837492831037, '2020-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, false, 'Patrice Something', 'patrice@cs.ubc.ca', 18237481, true, 2837461923094728, '2020-06-05 23:59:59', ?);
                `,
                [password, password, password, password, password],
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                INSERT INTO Location VALUES (150, 'Birdcoop', '1 West Mall');
                INSERT INTO Location VALUES (50, 'Gym 1', '1 West Mall');
                INSERT INTO Location VALUES (50, 'Gym 2', '1 West Mall');
                INSERT INTO Location VALUES (50, 'Gym 3', '1 West Mall');
                INSERT INTO Location VALUES (100, 'War Memorial Gym', '2 University Boulevard');
                INSERT INTO Location VALUES (100, 'Hugh Dempster Pavillion', '6245 Agronomy Road');
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                INSERT INTO IsLocated VALUES ('Gym 1', '1 West Mall', 000132);
                INSERT INTO IsLocated VALUES ('Hugh Dempster Pavillion', '6245 Agronomy Road', 000133);
                INSERT INTO IsLocated VALUES ('Gym 3', '1 West Mall', 000134);
                INSERT INTO IsLocated VALUES ('Birdcoop', '1 West Mall', 000135);
                INSERT INTO IsLocated VALUES ('Birdcoop', '1 West Mall', 000136);
                INSERT INTO IsLocated VALUES ('Gym 2', '1 West Mall', 000137);
                INSERT INTO IsLocated VALUES ('Gym 2', '1 West Mall', 000140);
                INSERT INTO IsLocated VALUES ('Gym 2', '1 West Mall', 000141);
                INSERT INTO IsLocated VALUES ('War Memorial Gym', '2 University Boulevard', 000152);
                INSERT INTO IsLocated VALUES ('War Memorial Gym', '2 University Boulevard', 000153);
                INSERT INTO IsLocated VALUES ('Gym 2', '1 West Mall', 000154);
                INSERT INTO IsLocated VALUES ('Gym 2', '1 West Mall', 000155);
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                INSERT INTO TeachesClass VALUES (000135, 12341133);
                INSERT INTO TeachesClass VALUES (000132, 12345678);
                INSERT INTO TeachesClass VALUES (000137, 12345678);
                INSERT INTO TeachesClass VALUES (000133, 09289345);
                INSERT INTO TeachesClass VALUES (000136, 18237481);
                INSERT INTO TeachesClass VALUES (000134, 12345678);
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        },
        function (callback) {
            connection.query(
                `
                INSERT INTO Registers VALUES (00001234142093, true, 20.00, 000132, 12345678);
                INSERT INTO Registers VALUES (00001234142093, true, 15.00, 000133, 12345678);
                INSERT INTO Registers VALUES (00001234146789, true, 50.00, 000134, 12345678);
                INSERT INTO Registers VALUES (00001234142093, true, 15.00, 000135, 12345678);
                INSERT INTO Registers VALUES (00001234142093, true, 15.00, 000136, 12345678);
                INSERT INTO Registers VALUES (00001234142093, true, 20.00, 000137, 12345678);
                INSERT INTO Registers VALUES (00001234149812, true, 15.00, 000135, 23452344);
                INSERT INTO Registers VALUES (00001234145893, true, 15.00, 000135, 09289345);
                INSERT INTO Registers VALUES (00001234148437, true, 15.00, 000135, 18237481);
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        }
    ], function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        return console.log('Database has been seeded successfully');
    });
}