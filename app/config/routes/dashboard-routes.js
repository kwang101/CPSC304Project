module.exports = function(app) {
  /**
   * Display Home Page
  **/
  


app.get('/dashboard', function(req, res) {
    res.render('dashboard', {
      title: 'Dashboard',
      message: 'Dashboard',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });

}