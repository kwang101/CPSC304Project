const passport = require('passport');

module.exports = function(app) {

  var requiresLogin = require('./auth-routes').requiresLogin;

  var hasAuthorization = require('./auth-routes').hasAuthorization;
  
  /**
   * Display Instructor Profile
  **/
  app.get('/instructor', requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 1}), function(req, res) {
    res.render('instructor', {
      title: 'Your title',
      message: 'Your Message',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });

  /**
   * Receive Create Class Form Data
  **/
  app.post('/createclass',
    passport.authenticate('local-signup', { failureRedirect: '/createclass' }),
    function(req, res) {
      res.redirect('/');
  });
}
