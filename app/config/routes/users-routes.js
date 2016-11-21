module.exports = function (app) {
    /**
     * Display Home Page
    **/
    // var requiresLogin = require('./auth-routes').requiresLogin;
    // var hasAuthorization = require('./auth-routes').hasAuthorization;

    app.get('/users/*',
        // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            connection.query('SELECT * FROM program WHERE programId IN (SELECT programId FROM registers WHERE userId = ? )',
                [identification],
                function (err, registered, fields) {
                    if (err)
                        console.log('Error while performing Query.');
                    else
                        connection.query('SELECT * FROM program WHERE programId NOT IN (SELECT programId FROM registers WHERE userId = ? )',
                            [identification],
                            function (err, notRegistered, fields) {
                                if (err)
                                    console.log('Error while performing Query.');
                                else
                                    connection.query('SELECT * FROM user WHERE userId IN (SELECT userId FROM user WHERE userId = ?);',
                                        [identification],
                                        function (err, userexists, fields) {
                                            if (userexists.length == 0) 
                                                res.render('error',{
                                                    message: 'This User Does Not Exist'});
                                            else
                                                //console.log(identification);
                                                res.render('users', {
                                                    title: identification,
                                                    message: identification,
                                                    userName: (req.user) ? req.user.username : undefined,
                                                    flashMessage: req.flash('flashMessage'),
                                                    registered: registered,
                                                    notRegistered: notRegistered
                                                });
                                        });
                            });

                });
        });

    //
    /*POST to user pages - register/drop*/
    app.post('/users/*',
        // requiresLogin, 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            var programId = req.body.register || req.body.drop;
            var transactionId = Math.floor(Math.random() * 9999) + 1234140000;
            var isPaid = 1;
            var fees = 0;
            var isUBC = 1;
            console.log(fees);
            var userId = identification;
            console.log('dropvalue');
            console.log(req.body.drop);
            console.log('registervalue');
            console.log(req.body.register);
            //this is for drop
            if (req.body.drop != undefined) {
                console.log(programId);
                console.log(identification);
                connection.query('DELETE FROM registers WHERE programId = ? AND userId = ?',
                    [programId, identification],
                    function (err, result) {
                        if (err)
                            console.log('Error while Dropping.');
                        else
                            res.redirect(req.get('referer'));
                    }
                );
                //this is for register
            } else {
                connection.query('SELECT * FROM user WHERE userId = ?',
                    [identification],
                    function (err, user, fields) {
                        if (err)
                            console.log('Error while performing Query.');
                        else
                            //console.log(identification);
                            //console.log(user[0]['isUBC']);
                            if (user[0]['isUBC'] == 1) isUBC = 1
                            else isUBC = 2;
                        console.log('isUBC')
                        console.log(isUBC);
                        connection.query('SELECT * FROM program WHERE programId = ?',
                            [programId],
                            function (err, program, fields) {
                                if (err)
                                    console.log('Error while performing Query.');
                                else
                                    fees = program[0]['price'];
                                console.log('fees');
                                console.log(fees);
                                connection.query('INSERT INTO Registers VALUES (?, ?, ?, ?, ?)',
                                    [transactionId, isPaid, fees * isUBC, programId, userId],
                                    function (err, result) {
                                        if (err)
                                            console.log('Error while Registering.');
                                        else
                                            res.redirect(req.get('referer'));
                                    }
                                );
                            });
                    });
            }
        });

}