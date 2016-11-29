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
            connection.query('SELECT * FROM Program WHERE programId = ?',
                [identification],
                function (err, program, fields) {
                    if (err)
                        console.log('Error while performing Query.');
                    else
                        connection.query('SELECT * FROM Occurs WHERE programId = ?',
                            [identification],
                            function (err, occurs, fields) {
                                if (err)
                                    console.log('Error while performing Query.');
                                else
                                if (occurs.length == 0) occurs = [{ startTime: 'N/A', endTime: 'N/A', dayOfWeek: 'N/A'}];
                                    connection.query('SELECT * FROM IsLocated WHERE programId = ?',
                                        [identification],
                                        function (err, islocated, fields) {
                                            if (err)
                                                console.log('Error while performing Query.');
                                            else
                                            if (islocated.length == 0) islocated = [{ name: 'N/A', address: 'N/A' }];
                                            //console.log('islocated');
                                            //console.log(islocated);
                                                connection.query('Select * FROM User Where userID = (SELECT userID FROM TeachesClass Where programId = ?);',
                                                    [identification],
                                                    function (err, teacher, fields) {
                                                        console.log(teacher);
                                                        if (err)
                                                            console.log('Error while performing Query.');
                                                        else
                                                            if (teacher.length == 0) teacher = [{ name: 'N/A'}];
                                                            console.log(teacher.length);
                                                            console.log(teacher);
                                                            connection.query('Select Count(*) From Registers Where programId = ?',
                                                                [identification],
                                                                function (err, numberOfStudents, fields) {
                                                                    if (err)
                                                                        console.log('Error while performing Query.');
                                                                    else
                                                                    //var x = (x === undefined) ? def_val : {};
                                                                        console.log(identification);
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