module.exports = function (app) {
  /**
   * Display Home Page
  **/

  //var requiresLogin = require('./auth-routes').requiresLogin;

  app.get('/dashboard',
    //requiresLogin,
    function (req, res) {
      const connection = require('../connection.js');
      // var programType = [];
      // var term = [];
      // var price = [];
      // var name = [];
      // var programId = [];
      connection.query('SELECT * FROM Program', function (err, rows, fields) {
        if (err)
          console.log('Error while performing Query.');
        else
          //console.log(rows);
          // for (var i = 0; i < rows.length; i++) {
          // var row = rows[i];
          // console.log(row.programType);
          // programType.push(row.programType);
          // term.push(row.term);
          // price.push(row.price);
          // name.push(row.name);
          // programId.push(programId);
          // }
          connection.query('SELECT * FROM User;', function (err, users, fields) {
            if (err)
              console.log('Error while performing Query.');
            else
              res.render('dashboard', {
                title: 'Dashboard',
                message: 'Dashboard',
                userName: (req.user) ? req.user.username : undefined,
                flashMessage: req.flash('flashMessage'),
                rows: rows,
                users: users
                // programType: programType,
                // term: term,
                // price: price,
                // name: name,
                // programId: programId


              });
          });

      });

      //SELECT * FROM program;
      //


    })
}