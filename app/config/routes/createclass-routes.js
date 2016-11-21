const passport = require('passport');

module.exports = function(app) {
  var requiresLogin = require('./auth-routes').requiresLogin;

  var hasAuthorization = require('./auth-routes').hasAuthorization;
  //keep a list of information so we don't have to fetch it again
  function renderInstructorDisplayInformation(req, res) {
    const connection = require("../connection");
    connection.query('SELECT * from cpsc304_test.Program', function(err, programs, fields) {
        if (err)
          console.log("Error in createclass-routes.js: " + err);
        else
        connection.query('SELECT * from cpsc304_test.Location', function(err, locations, fields) {
            if (err)
              console.log("Error in createclass-routes.js: " + err);
            else
            connection.query('SELECT * from cpsc304_test.User', function(err, users, fields) {
                if (err)
                  console.log("Error in createclass-routes.js: " + err);
                else
                connection.query(
                    'SELECT * from cpsc304_test.User U where U.isInstructor=1',
                    function(err, instructors, fields) {
                        console.log("Instructor Route");
                        if (err) {
                            console.log("Error in createclass-routes.js: " + err);
                        } else {
                            res.render('instructor', {
                                title: 'Instructor',
                                message: 'Instructor',
                                userName: (req.user) ? req.user.username : undefined,
                                flashMessage: req.flash('flashMessage'),
                                programs : programs,
                                locations : locations,
                                instructors : instructors
                            });
                        }
                });
            });
        });
    });
  }

  /**
   * Receive Signin Form Data
  **/
  app.post('/signin',
    passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
  });

  /**
   * Display Instructor Console
  **/

  app.get('/admin', function(req, res) {
    renderAdminDisplayInformation(req, res);
  });

  /**
   * Receive Signup Form Data
  **/
  app.post('/addbuilding',
    passport.authenticate('local-signup', { failureRedirect: '/addbuilding' }),
    function(req, res) {
      res.redirect('/');
  });
  /**
   * Teacher creates new class
  **/
  app.post('/createclass', function(req, res) {
    console.log(req.body);
    const connection = require("../connection");
    connection.query('INSERT INTO cpsc304_test.Program VALUES (?, ?, ?, ?, ?)',
        [req.body.programType, req.body.term, req.body.price, req.body.name, req.body.programId],
        function(err, result) {
            if (err) {
                console.log(err);
                console.log("Error while adding program: " + req.body.name);
            } else {
                renderInstructorDisplayInformation(req, res);
            }
        });
  });
};
