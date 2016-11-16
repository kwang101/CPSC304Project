const passport = require('passport');

module.exports = function(app) {
  var requiresLogin = require('./auth-routes').requiresLogin;

  var hasAuthorization = require('./auth-routes').hasAuthorization;

  /**
   * Display Create Class Form
  **/
  app.get('/createclass', requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 1}), function(req, res) {
    res.render('createclass', {
      title: 'Your title',
      message: 'Create New Class',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });
};
