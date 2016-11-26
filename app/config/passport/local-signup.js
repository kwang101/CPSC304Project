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
    connection.query("SELECT * FROM user WHERE email = ?",
      [username],
      function(err, rows) {
        if (err) {
          return done(err);
        }

        if (rows.length) {
          return done(null, false, req.flash('flashMessage', 'Sorry! That email is already used.'));
        } else {
          let User = {
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
          };

          const insertQuery = "INSERT INTO user (email, passwordHash, isUBC, creditCard, expiryDate, isInstructor, name) values (?,?,?,?,?,?,?)";

          req.body.isUBC = req.body.isUBC === 'true';
          req.body.isInstructor = req.body.isInstructor === 'true';

          connection.query(insertQuery, [User.email, User.password, req.body.isUBC, req.body.creditcard, req.body.expirydate, req.body.isInstructor, req.body.name],
            function(err, row) {
              if (err) {
                console.log(err);
                return done(null, false, req.flash('flashMessage', 'Sorry! That email is already taken.'));
              }

              connection.query("SELECT * FROM user WHERE email = ? ",
                [User.email],
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        return done(null, false, req.flash('flashMessage', 'Couldn\'t save user.'));
                    }

                    console.log(rows);
                    User.userId = rows[0].userId;
                    done(null, User);
                });
          });
        }
      })
  }));
}
