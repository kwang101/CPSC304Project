const passport = require('passport');
const connection = require("../connection");
module.exports = function(app) {

  var requiresLogin = require('./auth-routes').requiresLogin;
  var hasAuthorization = require('./auth-routes').hasAuthorization;
  
  /**
   * Display Instructor Profile
  **/

  app.get('/instructor/*', requiresLogin, hasAuthorization({ isInstructor: 1}),
    function(req, res) {
        const connection = require('../connection.js');
        var identification = req.params['0'];
        connection.query('SELECT * FROM program WHERE programId IN (SELECT programId FROM TeachesClass WHERE userId = ? )',
            [identification],
            function (err, registered, fields) {
                if (err)
                    console.log('Error while performing Query.');
                else
                    connection.query('SELECT * FROM program WHERE programId NOT IN (SELECT programId FROM TeachesClass WHERE userId = ? )',
                            [identification],
                            function (err, notRegistered, fields) {
                                if (err)
                                    console.log('Error while performing Query.');
                                else
                                    connection.query('SELECT * FROM user WHERE userId IN (SELECT userId FROM user WHERE userId = ?);',
                                        [identification],
                                        function (err, userexists, fields) {
                                            if (userexists.length == 0) 
                                                res.render('error',{
                                                    message: 'This User Does Not Exist'});
                                            else
                                                //console.log(identification);
                                                res.render('instructor', {
                                                    title: identification,
                                                    message: identification,
                                                    userName: (req.user) ? req.user.username : undefined,
                                                    flashMessage: req.flash('flashMessage'),
                                                    registered: registered,
                                                    notRegistered: notRegistered
                                                });
                                        });
                            });
            });
});

  /**
   * POST to instructor pages - add/drop classes
  **/
  app.post('/instructor/*',
    function (req, res) {
      const connection = require('../connection.js');
            var identification = req.params['0'];
            var programId = req.body.register || req.body.drop;
            var transactionId = Math.floor(Math.random() * 9999) + 1234140000;
            var isUBC = 1;
            var userId = identification;
            console.log('dropvalue');
            console.log(req.body.drop);
            // this is for dropping classes
            if (req.body.drop != undefined) {
                console.log(programId);
                console.log(identification);
                connection.query('DELETE FROM TeachesClass WHERE programId = ? AND userId = ?',
                    [programId, identification],
                    function (err, result) {
                        if (err)
                            console.log('Error while Dropping.');
                        else
                            res.redirect(req.get('referer'));
                    }
                );
            }
        });

app.post('/instructorAddClass', function(req, res) {
    var identification = req.body.userId;
    var userId = identification;
    console.log(identification);
    console.log(req.body);
    connection.query('INSERT INTO cpsc304_test.Program VALUES (?, ?, ?, ?, ?)',
        [req.body.programType, req.body.term, req.body.price, req.body.name, req.body.programId],
        function(err, result) {
            if (err) {
                console.log(err);
                console.log("Error while adding class: " + req.body.name);
            } else {
                connection.query('INSERT INTO TeachesClass VALUES (?,?)',
                    [req.body.programId, userId],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            console.log("Error while adding class: " + req.body.name);
                        } else {
                            res.redirect(req.get('referer'));
                        }
                    })
            }
        });
  });
}
