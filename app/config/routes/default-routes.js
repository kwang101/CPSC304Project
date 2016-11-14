module.exports = function(app) {
  /**
   * Display Home Page
  **/
  app.get('/', function(req, res) {
    console.log(req.user);
    res.render('index', {
      title: 'Your page title',
      message: 'Your header message',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });
}
