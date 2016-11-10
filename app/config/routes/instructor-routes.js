const passport = require('passport');

module.exports = function(app) {

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
}
