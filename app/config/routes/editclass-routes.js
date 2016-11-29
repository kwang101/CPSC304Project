const passport = require('passport');
const connection = require("../connection");
module.exports = function(app) {

  var requiresLogin = require('./auth-routes').requiresLogin;

  var hasAuthorization = require('./auth-routes').hasAuthorization;
  
  function renderClassEditView(programId, req, res) {
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
                            connection.query('Select name, userId from User where userId IN (SELECT userId from Registers where programId=?)',
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
                                                                            connection.query('Select name, userId from User where userId NOT IN (SELECT userId from Registers where programId=?)',
                                                                                [programId],
                                                                                function(err, availableUsers) {
                                                                                    if (err) {
                                                                                        console.log(err);
                                                                                    } else {
                                                                                        res.render('editclass', {
                                                                                            title: 'Edit Class',
                                                                                            message: 'Edit Class',
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

  app.get('/editclass/*', function(req, res) {
    console.log(req.params);
    var programId = req.params['0'];
    renderClassEditView(programId, req, res);
  });

  app.post('/editClassPrice', function(req, res) {
        console.log(req.body);
        connection.query('UPDATE Program SET price=? where programId=?',
            [req.body.price, req.body.programId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderClassEditView(req.body.programId, req, res);
                }
            });
  });

  app.post('/editClassName', function(req, res) {
        console.log(req.body);
        connection.query('UPDATE Program SET name=? where programId=?',
            [req.body.name, req.body.programId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderClassEditView(req.body.programId, req, res);
                }
            });
    });

  app.post('/editClassLocation', function(req, res) {
        console.log(req.body);
        var location = req.body.location.split("-");
        var name = location[0];
        var address = location[1];
        connection.query('UPDATE IsLocated SET name=?, address=? where programId=?',
            [name, address, req.body.programId],
            function(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    renderClassEditView(req.body.programId, req, res);
                }
            });
    });
}
