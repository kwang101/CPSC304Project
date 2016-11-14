module.exports = function (app) {
    /**
     * Display Home Page
    **/
    var requiresLogin = require('./auth-routes').requiresLogin;
    var hasAuthorization = require('./auth-routes').hasAuthorization;

    app.get('/programs/*', requiresLogin, hasAuthorization({ isUBC: 1, isAdmin: 1, isInstructor: 0}), function (req, res) {
        const connection = require('../connection.js');
        var identification = req.params['0'];
        connection.query('SELECT * FROM program WHERE programId = ?',
            [identification],
            function (err, program, fields) {
                if (err)
                    console.log('Error while performing Query.');
                else
                res.render('programs', {
                    title: identification,
                    message: identification,
                    userName: (req.user) ? req.user.username : undefined,
                    flashMessage: req.flash('flashMessage'),
                    program: program
                });


            });
    });


}