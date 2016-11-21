const passport = require('passport');
const connection = require("../connection");
module.exports = function(app) {


  function renderProgramEditView(programId, req, res) {
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
                                                                                            programId : programId,
                                                                                            price : program[0].price
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
  };

  app.get('/editProgram/*', function(req, res) {
    console.log(req.params);
    var programId = req.params['0'];
    renderProgramEditView(programId, req, res);
  });

    app.post('/editProgramPrice', function(req, res) {
        console.log(req.body);
        connection.query('UPDATE cpsc304_test.Program SET price=? where programId=?',
            [req.body.price, req.body.programId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(req.body.programId, req, res);
                }
            });
    });

    app.post('/editProgramName', function(req, res) {
        console.log(req.body);
        connection.query('UPDATE cpsc304_test.Program SET name=? where programId=?',
            [req.body.name, req.body.programId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(req.body.programId, req, res);
                }
            });
    });

    app.post('/editInstructor', function(req, res) {
        console.log(req.body);
        connection.query('UPDATE cpsc304_test.TeachesClass SET userId=? where programId=?',
            [req.body.userId, req.body.programId],
            function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(req.body.programId, req, res);
                }
            });
    });

    app.post('/dropUserFromProgram', function(req, res) {
        console.log(req.body);
        connection.query('DELETE from cpsc304_test.Registers where programId=? AND userId=?',
            [req.body.programId, req.body.userId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(req.body.programId, req, res);
                }
            });
    });

    app.post('/editProgramLocation', function(req, res) {
        console.log(req.body);
        var location = req.body.location.split("-");
        var name = location[0];
        var address = location[1];
        connection.query('UPDATE cpsc304_test.IsLocated SET name=?, address=? where programId=?',
            [name, address, req.body.programId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(req.body.programId, req, res);
                }
            });
    });

    app.post('/addUsersToProgram', function(req, res) {
        console.log(req.body);
        var user = req.body.user.split("-");
        var name = user[0];
        var userId = user[1];
        var price = req.body.price;
        var transactionId = Math.floor(Math.random() * 9999) + 1234140000;
        connection.query('INSERT INTO cpsc304_test.Registers VALUES(?, true, ?, ?, ?)',
            [transactionId, price, req.body.programId, userId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(req.body.programId, req, res);
                }
            });
    });
}