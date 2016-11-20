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
    connection.query("SELECT * FROM User WHERE email = ?",
      [username],
      function(err, rows) {
        if (err) {
          return done(err);
        }

        if (rows.length) {
          return done(null, false, req.flash('flashMessage', 'Sorry! That email is already used.'));
        } else {
          const User = {
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
          };

          const insertQuery = "INSERT INTO User (email, passwordHash, isUBC) values (?,?, ?)";

          req.body.isUBC = req.body.isUBC == 'true';

          connection.query(insertQuery, [User.email, User.password, req.body.isUBC],
            function(err, row) {
              if (err) {
                console.log(err);
                return done(null, false, req.flash('flashMessage', 'Sorry! That email is already taken.'));
              }

              User.userId = row.userId;

              return done(null, User);
          });
        }
      })
  }));
}
