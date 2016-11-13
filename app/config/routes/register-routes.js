module.exports = function (app) {
  /**
   * Display Home Page
  **/

  app.get('/register', function (req, res) {
    const connection = require('../connection.js');
    connection.query('SELECT * FROM cpsc304_test.program', function (err, rows, fields) {
      if (err)
        console.log('Error while performing Query.');
      else
            res.render('register', {
              title: 'register',
              message: 'Register',
              userName: (req.user) ? req.user.username : undefined,
              flashMessage: req.flash('flashMessage'),
              rows: rows
            });
        });

    });

    //SELECT * FROM cpsc304_test.program;
    //


  }