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
   * Display Instructor Dashboard
  **/
  app.get('/instructor', function(req, res) {
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
