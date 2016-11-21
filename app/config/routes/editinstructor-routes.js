const passport = require('passport');
const connection = require("../connection");
module.exports = function(app) {


  function renderInstructorEditView(userId, req, res) {
    connection.query('SELECT * from cpsc304_test.Program where programId in (SELECT programId from cpsc304_test.TeachesClass where userId=?)',
        [userId],
        function(err, classes) {
            if (err) {
                console.log(err);
            } else {
                connection.query('SELECT * from cpsc304_test.Program where programType=? and programId not in (SELECT programId from cpsc304_test.Program where programId in (SELECT programId from cpsc304_test.TeachesClass where userId=?))',
                    ["class", userId],
                    function(err, availableClasses) {
                        if (err) {
                            console.log(err);
                        } else {
                            connection.query('SELECT * from cpsc304_test.User where userId=?',
                                [userId],
                                function(err, instructor) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render('editinstructor', {
                                            title: 'Edit Instructor',
                                            message: 'Edit Instructor',
                                            userName: (req.user) ? req.user.username : undefined,
                                            flashMessage: req.flash('flashMessage'),
                                            classes : classes,
                                            availableClasses : availableClasses,
                                            instructor : instructor
                                        });
                                    }
                                });
                        }
                    });
            }
        });
  };

  function performUserUpdate(column, userId, newValue, req, res) {
    connection.query('UPDATE cpsc304_test.User SET ' + column + '=? where userId=?',
        [newValue, userId],
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                renderInstructorEditView(userId, req, res);
            }
        });
  };

  app.get('/editInstructor/*', function(req, res) {
    console.log(req.params);
    var userId = req.params['0'];
    renderInstructorEditView(userId, req, res);
  });

    app.post('/dropClass', function(req, res) {
        console.log(req.body);
        var params = req.body;
        connection.query('DELETE FROM cpsc304_test.TeachesClass where programId=? and userId=?',
            [params.programId, params.userId],
            function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    renderInstructorEditView(params.userId, req, res);
                }
            });
    });

    app.post('/addClassToInstructor', function(req, res) {
        console.log(req.body);
        var params = req.body;
        var program = req.body.class.split("-");
        console.log(program);
        var programId = program[1];
        connection.query('INSERT INTO TeachesClass VALUES (?, ?)',
            [programId, params.userId],
            function(err) {
                if (err) {
                    console.log(err);
                } else {
                    renderInstructorEditView(params.userId, req, res);
                }
            });
    });
}