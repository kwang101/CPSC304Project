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

    //please help me
    /*POST to user pages - register/drop*/
    app.post('/users/*',
        // requiresLogin, 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            var programId = req.body.register || req.body.drop;
            var transactionId = Math.floor(Math.random() * 9999) + 1234140000;
            var isPaid = 0;
            var fees = 15;
            //the following doesnt work like id want to. im just giving fees a default value of 15 for now.
            //non UBC should just be 2 x price? idk
            // connection.query('Select price FROM program WHERE programId = ?',
            //     [programId],
            //     function (err, result) {
            //         if (err)
            //             console.log('Error during query.');
            //         else
            //             fees = result;
            //     }
            // );
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
                connection.query('INSERT INTO Registers VALUES (?, ?, ?, ?, ?)',
                    [transactionId, isPaid, fees, programId, userId],
                    function (err, result) {
                        if (err)
                            console.log('Error while Registering.');
                        else
                res.redirect(req.get('referer'));
                            }
                        );
            }
        });

}