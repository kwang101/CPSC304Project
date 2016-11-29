module.exports = function (app) {

    // var requiresLogin = require('./auth-routes').requiresLogin;
    // var hasAuthorization = require('./auth-routes').hasAuthorization;

    app.get('/lowerthan/*',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            connection.query('SELECT * FROM Program WHERE price <= ? ORDER BY price DESC',
                [identification],
                function (err, programs, fields) {
                    if (err)
                        console.log('Error while performing Query.');
                    else
                        //     console.log(identification);
                        // console.log(programs);
                        res.render('lowerthan', {
                            title: identification,
                            message: identification,
                            userName: (req.user) ? req.user.username : undefined,
                            flashMessage: req.flash('flashMessage'),
                            programs: programs
                        });
                });
        })

    app.post('/lowerthan/*',
        function (req, res) {
            var input = req.body.number;
            console.log(input);
            res.redirect('../lowerthan/' + input);
        }
    );

    //laterthan
    app.get('/laterthan/*',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            connection.query('SELECT programType, term, name, startTime, endTime, dayOfWeek, p.programId FROM Program p JOIN Occurs o ON o.programId = p.programId AND o.startTime >= ? ORDER BY startTime;',
                [identification],
                function (err, programs, fields) {
                    if (err)
                        console.log('Error while performing Query.');
                    else
                        //     console.log(identification);
                        // console.log(programs);
                        res.render('laterthan', {
                            title: identification,
                            message: identification,
                            userName: (req.user) ? req.user.username : undefined,
                            flashMessage: req.flash('flashMessage'),
                            programs: programs
                        });
                });
        })

    app.post('/laterthan/*',
        function (req, res) {
            var input = req.body.number;
            console.log(input);
            res.redirect('../laterthan/' + input);
        }
    );

    //most expensive and least expensive aggregation
    app.get('/expensive/*',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            console.log(identification);
            if (identification == "most") {
                connection.query('SELECT * FROM Program WHERE price = (SELECT MAX(price) FROM Program);',
                    function (err, programs, fields) {
                        if (err)
                            console.log('Error while performing Query.');
                        else
                            //     console.log(identification);
                            // console.log(programs);
                            res.render('expensive', {
                                title: identification,
                                message: 'Most Expensive Programs',
                                userName: (req.user) ? req.user.username : undefined,
                                flashMessage: req.flash('flashMessage'),
                                programs: programs
                            });
                    });
            }
            else
                connection.query('SELECT * FROM Program WHERE price = (SELECT MIN(price) FROM Program);',
                    function (err, programs, fields) {
                        if (err)
                            console.log('Error while performing Query.');
                        else
                            //     console.log(identification);
                            // console.log(programs);
                            res.render('expensive', {
                                title: identification,
                                message: 'Least Expensive Programs',
                                userName: (req.user) ? req.user.username : undefined,
                                flashMessage: req.flash('flashMessage'),
                                programs: programs,

                            });
                    });
        });

    app.get('/avg/*',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            console.log(identification);
            if (identification == "price") {
                connection.query('SELECT programType, AVG(price) AS average FROM Program GROUP BY programType',
                    function (err, rows, fields) {
                        if (err)
                            console.log('Error while performing Query.');
                        else
                            //     console.log(identification);
                            console.log(rows);
                        res.render('avg', {
                            title: identification,
                            message: 'Average Cost',
                            userName: (req.user) ? req.user.username : undefined,
                            flashMessage: req.flash('flashMessage'),
                            rows: rows,
                        });
                    });
            }
            else if (identification == "capacity")
                connection.query('SELECT programType, AVG(capacity) AS average FROM programcapacity GROUP BY programType',
                    function (err, rows, fields) {
                        if (err)
                            console.log('Error while performing Query.');
                        else
                            //     console.log(identification);
                            console.log(rows);
                        res.render('avg', {
                            title: identification,
                            message: 'Average Capacity',
                            userName: (req.user) ? req.user.username : undefined,
                            flashMessage: req.flash('flashMessage'),
                            rows: rows,
                        });
                    });
        })

    app.get('/division',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            connection.query('SELECT s.name FROM User s WHERE NOT EXISTS (SELECT programId FROM classes p WHERE NOT EXISTS (SELECT s.userId FROM Registers r WHERE s.userId=r.userId AND p.programId = r.programId));',
                [identification],
                function (err, users, fields) {
                    if (err)
                        console.log('Error while performing Query.');
                    else
                        //     console.log(identification);
                        // console.log(programs);
                        res.render('division', {
                            title: identification,
                            message: identification,
                            userName: (req.user) ? req.user.username : undefined,
                            flashMessage: req.flash('flashMessage'),
                            users: users
                        });
                });
        })
};
