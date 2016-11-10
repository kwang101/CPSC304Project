module.exports = function (app) {
  /**
   * Display Home Page
  **/

  app.get('/dashboard', function (req, res) {
    const connection = require('../connection.js');
    var programType;
    var term;
    var price;
    var name;
    var programId;
    connection.query('SELECT * FROM cpsc304_test.program', function (err, rows, fields) {
      if (err)
        console.log('Error while performing Query.');
      else
        console.log(rows);
        //console.log(rows.length);
        //for (var i = 0; i < rows.length; i++) {
        //  programType.push(rows[i]['programType']);
        //}
        //console.log(programType);

      res.render('dashboard', {
        title: 'Dashboard',
        message: 'Dashboard',
        userName: (req.user) ? req.user.username : undefined,
        flashMessage: req.flash('flashMessage'),
        // programType: programType,
        // term: term,
        // price: price,
        // name: name,
        // programId: programId

      });
    });

  });

  //SELECT * FROM cpsc304_test.program;



}