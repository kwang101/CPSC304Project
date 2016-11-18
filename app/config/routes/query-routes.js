module.exports = function (app) {

    // var requiresLogin = require('./auth-routes').requiresLogin;
    // var hasAuthorization = require('./auth-routes').hasAuthorization;

    app.get('/lowerthan/*',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            connection.query('SELECT * FROM program WHERE price <= ?',
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

    //most expensive and least expensive aggregation
    app.get('/expensive/*',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            console.log(identification);
            if (identification == "most") {
            connection.query('SELECT * FROM program WHERE price = (SELECT MAX(price) FROM program);',
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
            connection.query('SELECT * FROM program WHERE price = (SELECT MIN(price) FROM program);',
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
        })
}
