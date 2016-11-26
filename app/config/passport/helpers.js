const connection    = require('../connection.js');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
  connection.query("SELECT * FROM user WHERE userId = ? ",
    [id],
    function(err, rows) {
      console.log(rows);
      done(err, rows[0]);
  });
});
