module.exports = function (app) {
  /**
   * Display Home Page
  **/
  app.get('/', function (req, res) {
    console.log('boom');
    console.log(req.user);
    console.log('ba');
    if (req.user != null) {console.log(req.user.userId);
    res.render('index', {
      title: 'Your page title',
      message: 'Your header message',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage'),
      userId: req.user.userId
    });
    }
    else {
      res.render('index', {
      title: 'Your page title',
      message: 'Your header message',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage'),
      userId: ""
    });
    }
  });

  // app.post('/',
  //   function (req, res) {
  //     var input = req.body.number;
  //     console.log(input);
  //     res.redirect('../users/' + input);
  //   }
  // );

  app.post('/',
    // requiresLogin, 
    function (req, res) {
      //this is for user
      const connection = require('../connection.js');
      //console.log('user');
      //console.log(req.body.user);
      //console.log('admin');
      //console.log(req.body.admin);
      var input = req.body.number;
      //console.log(input);
      if (req.body.user != undefined) {
        res.redirect('../users/' + input);
        //this is for admin
      } else if (req.body.admin != undefined) {
        connection.query('SELECT * FROM user WHERE userId IN (SELECT userId FROM user WHERE userId = ? AND isAdmin = 1)',
          [input],
          function (err, adminexists, fields) {
            //console.log(adminexists);
            if (adminexists.length == 0)
              res.render('error', {
                message: 'Nice try buddy. You ain\'t no Admin!'
              });
            else
              res.redirect('../admin');
          });
      } else if (req.body.instructor != undefined) {
        connection.query('SELECT * FROM user WHERE userId IN (SELECT userId FROM user WHERE userId = ? AND isInstructor = 1)',
          [input],
          function (err, instructorexists, fields) {
            //console.log(instructorexists);
            if (instructorexists.length == 0)
              res.render('error', {
                message: 'Nice try buddy. You ain\'t no Instructor!'
              });
            else
              res.redirect('../instructor/' + input);
          });
      }
    });
}
