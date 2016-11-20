const passport = require('passport');

module.exports = function(app) {


  app.get('/editProgram/*', function(req, res) {
    console.log(req.params);
    var programId = req.params['0'];
    const connection = require("../connection");
    connection.query('SELECT * from cpsc304_test.Program where programId = ?',
        [programId],
        function(err, program) {
            if (err) {
                console.log("Error while getting program " + programId);
            } else {
                connection.query('SELECT name, address from cpsc304_test.IsLocated where programId=?',
                    [programId],
                    function(err, locations) {
                        if (err) {
                            console.log(err);
                            console.log("Error while getting programlocation " + programId);
                        } else {
                            connection.query('Select name, userId from cpsc304_test.User where userId IN (SELECT userId from cpsc304_test.Registers where programId=?)',
                                [programId],
                                function(err, users){
                                    if (err) {
                                        console.log("Error while getting userIds " + programId);
                                    } else {
                                        connection.query('SELECT userId, name from cpsc304_test.User where isInstructor=1',
                                            function(err, availableInstructors) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    connection.query('SELECT userId, name from cpsc304_test.User where userId IN (select userId from cpsc304_test.TeachesClass where programId=?)',
                                                        [programId],
                                                        function(err, instructor) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                connection.query('SELECT name, address from cpsc304_test.Location',
                                                                    function(err, availableLocations) {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        } else {
                                                                            connection.query('Select name, userId from cpsc304_test.User where userId NOT IN (SELECT userId from cpsc304_test.Registers where programId=?)',
                                                                                [programId],
                                                                                function(err, availableUsers) {
                                                                                    if (err) {
                                                                                        console.log(err);
                                                                                    } else {
                                                                                        res.render('editprogram', {
                                                                                            title: 'Edit Program',
                                                                                            message: 'Edit Program',
                                                                                            userName: (req.user) ? req.user.username : undefined,
                                                                                            flashMessage: req.flash('flashMessage'),
                                                                                            program : program,
                                                                                            locations : locations,
                                                                                            users : users,
                                                                                            instructor : instructor,
                                                                                            availableLocations : availableLocations,
                                                                                            availableInstructors : availableInstructors,
                                                                                            availableUsers : availableUsers,
                                                                                            programId : programId
                                                                                        });
                                                                                    }
                                                                                });
                                                                        }
                                                                    });
                                                            }
                                                        });
                                                }
                                            });
                                    }
                                });
                        }
                    });
            }
        });
  });

    app.post('/editProgramName', function(req, res) {
        console.log(req.body);
    });

    app.post('/editInstructor', function(req, res) {
        console.log(req.body);
    });

    app.post('/dropUserFromProgram', function(req, res) {
        console.log(req.body);
    });

    app.post('/editProgramLocation', function(req, res) {
        console.log(req.body);
    });
}