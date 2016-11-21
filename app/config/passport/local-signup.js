const connection    = require('../connection.js');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');

module.exports = function(salt) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, done) {
    console.log("REQ");
    console.log(req);
    console.log("USERNAME");
    console.log(username);
    console.log(password);
    console.log(done);
    connection.query("SELECT * FROM User WHERE email = ?",
      [username],
      function(err, rows) {
        if (err) {
          return done(err);
        }

        if (rows.length) {
          return done(req, req.res);
        } else {
          const User = {
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
          };

          var userId = Math.floor(Math.random() * 99999999) + 0;
          const insertQuery = "INSERT INTO User VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

          req.body.isUBC = req.body.isUBC == 'true';
          req.body.isInstructor = req.body.isInstructor == 'false';
          req.body.isUBC = req.body.isUBC ? 1 : 0;
          req.body.isInstructor = req.body.isInstructor ? 1 : 0;

          connection.query(insertQuery, [0, req.body.isInstructor, req.body.name, User.email, userId, req.body.isUBC, req.body.creditCard, req.body.expiryDate, User.password],
            function(err, row) {
              if (err) {
                console.log(err);
                return done(req, req.res);
              }

              User.userId = row.userId;

              return done(req, req.res);
          });
        }
      })
  }));
}
