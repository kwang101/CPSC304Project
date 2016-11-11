module.exports = function (app) {
  /**
   * Display Home Page
  **/

  app.get('/dashboard', function (req, res) {
    const connection = require('../connection.js');
    var programType = [];
    var term = [];
    var price = [];
    var name = [];
    var programId = [];
    connection.query('SELECT * FROM cpsc304_test.program', function (err, rows, fields) {
      if (err)
        console.log('Error while performing Query.');
      else
        //console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          // var row = rows[i];
          // console.log(row.programType);
          // programType.push(row.programType);
          // term.push(row.term);
          // price.push(row.price);
          // name.push(row.name);
          // programId.push(programId);
        }
      // console.log(programType);
      // console.log(term);
      // console.log(price);
      // console.log(name);
      //console.log(programId);
      res.render('dashboard', {
        title: 'Dashboard',
        message: 'Dashboard',
        userName: (req.user) ? req.user.username : undefined,
        flashMessage: req.flash('flashMessage'),
        rows: rows,
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