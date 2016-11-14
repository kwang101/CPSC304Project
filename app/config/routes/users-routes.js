module.exports = function (app) {
    /**
     * Display Home Page
    **/
    var requiresLogin = require('./auth-routes').requiresLogin;

    app.get('/users/*', requiresLogin, function (req, res) {
        const connection = require('../connection.js');
        var identification = req.params['0'];
        connection.query('SELECT * FROM program WHERE programId = (SELECT programId FROM cpsc304_test.registers WHERE userId = ? )',
            [identification],
            function (err, registered, fields) {
                if (err)
                    console.log('Error while performing Query.');
                else
                    connection.query('SELECT * FROM program WHERE programId != (SELECT programId FROM cpsc304_test.registers WHERE userId = ? )',
                        [identification],
                        function (err, notRegistered, fields) {
                            if (err)
                                console.log('Error while performing Query.');
                            else
                                console.log(identification);
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

    /*POST to user pages - register*/
    app.post('/users/*', requiresLogin, function (req, res) {
        const connection = require('../connection.js');
        var identification = req.params['0'];
        var inputValue = req.body.submit;
        var transactionId = Math.floor(Math.random() * 999999999) + 1000000000;
        var isPaid = 0;
        var fees = 15;
        var programId = inputValue;
        var userId = identification;
        console.log('boom')
        connection.query('INSERT INTO Registers VALUES (?, ?, ?, ?, ?)',
            [transactionId, isPaid, fees, programId, userId],
            function (err, result) {
                if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                else
                    res.redirect(req.get('referer'));
            }
        );

    });



}