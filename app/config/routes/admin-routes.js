const passport = require('passport');

module.exports = function(app) {
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

        connection.query('SELECT * from cpsc304_test.Location', function(err, locations, fields) {

            connection.query('SELECT * from cpsc304_test.User', function(err, users, fields) {

                connection.query(
                    'SELECT User.name, Program.name from cpsc304_test.User, cpsc304_test.TeachesClass, cpsc304_test.Program where User.userId=TeachesClass.userId and TeachesClass.programId=Program.programId', function(err, instructors, fields) {
                        console.log("PROGRAMS");
                        console.log(programs);
                        console.log(programs[0]);
                        console.log("LOCATIONS");
                        console.log(locations);
                        console.log("USERS");
                        console.log(users);
                        console.log("INSTRUCTORS");
                        console.log(instructors);

                        res.render('admin', {
                            title: 'Your title',
                            message: 'Your Message',
                            userName: (req.user) ? req.user.username : undefined,
                            flashMessage: req.flash('flashMessage'),
                            programs : programs,
                            locations : locations,
                            users : users,
                            instructors : instructors
                        });
                    });
            });
        });
    });
    res.render('admin', {
      title: 'Your title',
      message: 'Your Message',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
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
}
