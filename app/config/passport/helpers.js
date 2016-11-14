const connection    = require('../connection.js');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
  connection.query("SELECT * FROM User WHERE userId = ? ",
    [id],
    function(err, rows) {
      done(err, rows[0]);
  });
});
