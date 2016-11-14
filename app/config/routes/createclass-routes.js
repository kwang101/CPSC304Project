const passport = require('passport');

module.exports = function(app) {
  var requiresLogin = require('./auth-routes').requiresLogin;

  /**
   * Display Create Class Form
  **/
  app.get('/createclass', requiresLogin, function(req, res) {
    res.render('createclass', {
      title: 'Your title',
      message: 'Create New Class',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });
}
