module.exports = function () {
    var salt = '$2a$10$wENMOiXaNvkXN9BmCbh4ZO';
    const connection = require('./config/connection');
    const async = require('async');
    const bcrypt = require('bcryptjs');

    async.waterfall([
        function (callback) {
            connection.query(
                `
                INSERT INTO Date VALUES ('2016-01-09 11:00:00', '2016-01-09 12:00:00', 3);
                INSERT INTO Date VALUES('2016-01-10 11:00:00', '2016-01-10 12:00:00', 4);
                INSERT INTO Date VALUES('2016-01-11 11:00:00', '2016-01-11 12:00:00', 5);
                INSERT INTO Date VALUES('2016-01-12 11:00:00', '2016-01-12 12:00:00', 6);
                INSERT INTO Date VALUES('2016-01-13 11:00:00', '2016-01-13 12:00:00', 7);
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
                INSERT INTO Program VALUES ('class', 1, 15.00, 'Pilates', 000135);
                INSERT INTO Program VALUES ('class', 2, 20.00, 'T-Bagging', 000137);
                INSERT INTO Program VALUES ('class', 1, 15.00, 'Meme-ing', 000133);
                INSERT INTO Program VALUES ('class', 1, 15.00, 'Wrestling', 000136);
                INSERT INTO Program VALUES ('dropin', 1, 10.00, 'Basketball Drop-in', 000140);
                INSERT INTO Program VALUES ('dropin', 1, 10.00, 'Volleyball Drop-in', 000141);
                INSERT INTO Program VALUES ('intramural', 1, 0, 'Volleyball Intramural Tier 2', 000152);
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
                INSERT INTO Occurs VALUES ('2016-01-09 11:00:00', '2016-01-09 12:00:00', 3, 000141);
                INSERT INTO Occurs VALUES ('2016-01-10 11:00:00', '2016-01-10 12:00:00', 3, 000141);
                INSERT INTO Occurs VALUES ('2016-01-11 11:00:00', '2016-01-11 12:00:00', 3, 000141);
                INSERT INTO Occurs VALUES ('2016-01-12 11:00:00', '2016-01-12 12:00:00', 3, 000141);
                INSERT INTO Occurs VALUES ('2016-01-13 11:00:00', '2016-01-13 12:00:00', 3, 000141);
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
                INSERT INTO User VALUES (true, 'Edward Zhou', 12345678, true, 4432013293128423, '2018-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, 'Mike Feeley', 12341133, true, 9877123487652342, '2020-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, 'Steve Wolfman', 23452344, true, 1234267842641234, '2020-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, 'Gregor Kiczales', 09289345, true, 9472837492831037, '2020-06-05 23:59:59', ?);
                INSERT INTO User VALUES (false, 'Patrice Something', 18237481, true, 2837461923094728, '2020-06-05 23:59:59', ?);
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
                INSERT INTO UserSession VALUES (12345678, '2016-10-18 12:40:00');
                INSERT INTO UserSession VALUES (12341133, '2016-10-17 10:40:00');
                INSERT INTO UserSession VALUES (23452344, '2016-10-17 13:40:00');
                INSERT INTO UserSession VALUES (09289345, '2016-10-18 12:40:00');
                INSERT INTO UserSession VALUES (18237481, '2016-10-18 13:20:00');
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
                INSERT INTO Location VALUES (150, 'Birdcoop', '1 West Mall');
                INSERT INTO Location VALUES (50, 'Gym 1', '1 West Mall');
                INSERT INTO Location VALUES (50, 'Gym 2', '1 West Mall');
                INSERT INTO Location VALUES (50, 'Gym 3', '1 West Mall');
                INSERT INTO Location VALUES (100, 'War Memorial Gym', '2 University Boulevard');
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
                INSERT INTO IsLocated VALUES ('Birdcoop', '1 West Mall', 000140);
                INSERT INTO IsLocated VALUES ('War Memorial Gym', '2 University Boulevard', 000152);
                INSERT INTO IsLocated VALUES ('Birdcoop', '1 West Mall', 000135);
                INSERT INTO IsLocated VALUES ('Birdcoop', '1 West Mall', 000132);
                INSERT INTO IsLocated VALUES ('Gym 2', '1 West Mall', 000141);
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
                INSERT INTO Registers VALUES (00001234141321, true, 15.00, 000135, 12341133);
                INSERT INTO Registers VALUES (00001234149812, true, 15.00, 000135, 23452344);
                INSERT INTO Registers VALUES (00001234145893, true, 15.00, 000135, 09289345);
                INSERT INTO Registers VALUES (00001234148437, true, 15.00, 000135, 18237481)
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