module.exports = function (app) {
    /**
     * Display Home Page
    **/
    // var requiresLogin = require('./auth-routes').requiresLogin;
    // var hasAuthorization = require('./auth-routes').hasAuthorization;

    app.get('/programs/*',
        // requiresLogin, hasAuthorization({ isUBC: 1, isAdmin: 1, isInstructor: 0}), 
        function (req, res) {
            const connection = require('../connection.js');
            var identification = req.params['0'];
            connection.query('SELECT * FROM program WHERE programId = ?',
                [identification],
                function (err, program, fields) {
                    if (err)
                        console.log('Error while performing Query.');
                    else
                        connection.query('SELECT * FROM occurs WHERE programId = ?',
                            [identification],
                            function (err, occurs, fields) {
                                if (err)
                                    console.log('Error while performing Query.');
                                else
                                    connection.query('SELECT * FROM islocated WHERE programId = ?',
                                        [identification],
                                        function (err, islocated, fields) {
                                            if (err)
                                                console.log('Error while performing Query.');
                                            else
                                                connection.query('Select * FROM user Where userID = (SELECT userID FROM teachesclass Where programId = ?);',
                                                    [identification],
                                                    function (err, teacher, fields) {
                                                        if (err)
                                                            console.log('Error while performing Query.');
                                                        else
                                                            connection.query('Select Count(*) From registers Where programId = ?',
                                                                [identification],
                                                                function (err, numberOfStudents, fields) {
                                                                    if (err)
                                                                        console.log('Error while performing Query.');
                                                                    else
                                                                    //var x = (x === undefined) ? def_val : {};
                                                                        console.log(identification);
                                                                    console.log(teacher[0]);
                                                                    //console.log(occurs);
                                                                    //console.log(numberOfStudents[0]['Count(*)']);
                                                                    res.render('programs', {
                                                                        title: identification,
                                                                        message: identification,
                                                                        userName: (req.user) ? req.user.username : undefined,
                                                                        flashMessage: req.flash('flashMessage'),
                                                                        program: program[0],
                                                                        occurs: occurs[0],
                                                                        islocated: islocated[0],
                                                                        teacher: teacher[0],
                                                                        count: numberOfStudents[0]['Count(*)']
                                                                    });
                                                                });
                                                    });
                                        });
                            });
                });
        });


}