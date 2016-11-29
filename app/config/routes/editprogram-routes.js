const passport = require('passport');
const connection = require("../connection");
module.exports = function(app) {


  function renderProgramEditView(programId, req, res) {
    connection.query('SELECT * from Program where programId = ?',
        [programId],
        function(err, program) {
            if (err) {
                console.log("Error while getting program " + programId);
            } else {
                connection.query('SELECT name, address from IsLocated where programId=?',
                    [programId],
                    function(err, locations) {
                        if (err) {
                            console.log(err);
                            console.log("Error while getting programlocation " + programId);
                        } else {
                            connection.query('SELECT name, userId from User where userId IN (SELECT userId from Registers where programId=?)',
                                [programId],
                                function(err, users){
                                    if (err) {
                                        console.log("Error while getting userIds " + programId);
                                    } else {
                                        connection.query('SELECT userId, name from User where isInstructor=1',
                                            function(err, availableInstructors) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    connection.query('SELECT userId, name from User where userId IN (select userId from TeachesClass where programId=?)',
                                                        [programId],
                                                        function(err, instructor) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                connection.query('SELECT name, address from Location',
                                                                    function(err, availableLocations) {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        } else {
                                                                            connection.query('SELECT name, userId from User where userId NOT IN (SELECT userId from Registers where programId=?)',
                                                                                [programId],
                                                                                function(err, availableUsers) {
                                                                                    if (err) {
                                                                                        console.log(err);
                                                                                    } else {
                                                                                        connection.query('SELECT * from Occurs where programId=?',
                                                                                            [programId],
                                                                                            function(err, occurs) {
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
                                                                                                        price : program[0].price,
                                                                                                        occurs : occurs
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
        connection.query('UPDATE Program SET price=? where programId=?',
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
        connection.query('UPDATE Program SET name=? where programId=?',
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
        connection.query('UPDATE TeachesClass SET userId=? where programId=?',
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
        connection.query('DELETE from Registers where programId=? AND userId=?',
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
        connection.query('DELETE FROM IsLocated where programId=?',
            [req.body.programId],
            function(err, response) {
                connection.query('INSERT INTO IsLocated VALUES(?, ?, ?)',
                    [name, address, req.body.programId],
                    function(err, response) {
                        if (err) {
                            console.log(err);
                        } else {
                            renderProgramEditView(req.body.programId, req, res);
                        }
                    });
            });
    });

    app.post('/addUsersToProgram', function(req, res) {
        console.log(req.body);
        var user = req.body.user.split("-");
        var name = user[0];
        var userId = user[1];
        var price = req.body.price;
        var transactionId = Math.floor(Math.random() * 9999) + 1234140000;
        connection.query('INSERT INTO Registers VALUES(?, true, ?, ?, ?)',
            [transactionId, price, req.body.programId, userId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(req.body.programId, req, res);
                }
            });
    });

    app.post('/addNewOccurs', function(req, res) {
        console.log(req.body);
        var params = req.body;
        connection.query('INSERT IGNORE INTO Date VALUES(?, ?, ?)',
            [params.startTime, params.endTime, params.dayOfWeek],
            function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    connection.query('INSERT IGNORE INTO Occurs VALUES(?, ?, ?, ?)',
                    [params.startTime, params.endTime, params.dayOfWeek, params.programId],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            renderProgramEditView(params.programId, req, res);
                        }
                    });
                }
            });
    });

    app.post('/dropDate', function(req, res) {
        console.log(req.body);
        var params = req.body;
        connection.query('DELETE from Occurs where startTime=? and endTime=? and dayOfWeek=? and programId=?',
            [params.startTime, params.endTime, params.dayOfWeek, params.programId],
            function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    renderProgramEditView(params.programId, req, res);
                }
            });
    });
}