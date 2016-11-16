const passport = require('passport');

module.exports = function(app) {

    var requiresLogin = require('./auth-routes').requiresLogin;
    var hasAuthorization = require('./auth-routes').hasAuthorization;

  /**
   * Receive Signin Form Data
  **/
  app.post('/signin',
    passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
  });

  /**
   * Display Admin Console
  **/

  app.get('/admin', function(req, res) {
    const connection = require("../connection");
    connection.query('SELECT * from cpsc304_test.Program', function(err, programs, fields) {
        if (err)
          console.log("Error in admin-routes.js: " + err);
        else
        connection.query('SELECT * from cpsc304_test.Location', function(err, locations, fields) {
            if (err)
              console.log("Error in admin-routes.js: " + err);
            else
            connection.query('SELECT * from cpsc304_test.User', function(err, users, fields) {
                if (err)
                  console.log("Error in admin-routes.js: " + err);
                else
                connection.query(
                    'SELECT name, userId from cpsc304_test.User U where U.isInstructor=1',
                    function(err, instructors, fields) {
                        console.log("Admin Route");
                        if (err) {
                            console.log("Error in admin-routes.js: " + err);
                        } else {
                            res.render('admin', {
                                title: 'Admin',
                                message: 'Admin',
                                userName: (req.user) ? req.user.username : undefined,
                                flashMessage: req.flash('flashMessage'),
                                programs : programs,
                                locations : locations,
                                users : users,
                                instructors : instructors
                            });
                        }
                });
            });
        });
    });
  });

  /**
   * Receive Signup Form Data
  **/
  app.post('/addbuilding',
    passport.authenticate('local-signup', { failureRedirect: '/addbuilding' }),
    function(req, res) {
      res.redirect('/');
  });

  app.delete('/adminDropProgram', function(req, res) {

  });
}
