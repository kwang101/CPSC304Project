const passport = require('passport');

module.exports = function(app) {

  /**
   * Display Create Class Form
  **/
  app.get('/createclass', function(req, res) {
    res.render('createclass', {
      title: 'Your title',
      message: 'Create New Class',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });
}
