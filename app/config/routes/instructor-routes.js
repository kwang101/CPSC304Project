const passport = require('passport');

module.exports = function(app) {

  var requiresLogin = require('./auth-routes').requiresLogin;

  var hasAuthorization = require('./auth-routes').hasAuthorization;
  
  /**
   * Display Instructor Profile
  **/
  app.get('/instructor/*', 
    // requiresLogin, hasAuthorization({ isUBC: 0, isAdmin: 1, isInstructor: 1}), 
    function(req, res) {
        const connection = require('../connection.js');
        var identification = req.params['0'];
        connection.query('SELECT * FROM program WHERE programId IN (SELECT programId FROM TeachesClass WHERE userId = ? )',
            [identification],
            function(err, registered, fields) {
                if (err)
                    console.log('Error while performing Query.');
                else
                    connection.query('SELECT * FROM program WHERE programId NOT IN (SELECT programId FROM TeachesClass WHERE userId = ? )',
                            [identification],
                            function(err, notRegistered, fields) {
                                if (err)
                                    console.log('Error while performing Query.');
                                else
                                    //console.log(identification);
                                    res.render('users', {
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

  /**
   * POST to instructor pages - add/drop classes
  **/
  app.post('/instructor/*',
    // requiresLogin,
    // passport.authenticate('local-signup', { failureRedirect: '/instructor' }),
    function(req, res) {
      const connection = require('../connection.js');
            var identification = req.params['0'];
            var programId = req.body.register || req.body.drop;
            var transactionId = Math.floor(Math.random() * 9999) + 1234140000;
            var isUBC = 1;
            var userId = identification;
            console.log('dropvalue');
            console.log(req.body.drop);
            console.log('registervalue');
            console.log(req.body.register);
            // this is for dropping classes
            if (req.body.drop != undefined) {
                console.log(programId);
                console.log(identification);
                connection.query('DELETE FROM TeachesClass WHERE programId = ? AND userId = ?',
                    [programId, identification],
                    function(err, result) {
                        if (err)
                            console.log('Error while Dropping.');
                        else
                            res.redirect(req.get('referer'));
                    }
                );
                // this is for adding classes
            }
        });
}
