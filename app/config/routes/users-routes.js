module.exports = function (app) {
    /**
     * Display Home Page
    **/

    app.get('/users/*', function (req, res) {
        const connection = require('../connection.js');
        var identification = req.params['0'];
        connection.query('SELECT * FROM cpsc304_test.program WHERE programId = (SELECT programId FROM cpsc304_test.registers WHERE userId = ? )',
            [identification],
            function (err, registered, fields) {
                if (err)
                    console.log('Error while performing Query.');
                else
                    connection.query('SELECT * FROM cpsc304_test.program WHERE programId != (SELECT programId FROM cpsc304_test.registers WHERE userId = ? )',
                        [identification],
                        function (err, notRegistered, fields) {
                            if (err)
                                console.log('Error while performing Query.');
                            else
                                console.log(identification);
                            res.render('users', {
                                title: identification,
                                message: 'Your Dashboard',
                                userName: (req.user) ? req.user.username : undefined,
                                flashMessage: req.flash('flashMessage'),
                                registered: registered,
                                notRegistered: notRegistered
                            });
                        });

            });
    });

    /*POST to user pages - register/drop????*/
    app.post('/users/*', function (req, res) {
        const connection = require('../connection.js');
        var identification = req.params['0'];
        if (currentUser.getIsLoggedIn() != true) {
            res.send("You must be logged in");
        }
        else {
            //db variable
            var db = req.db;
            //set our collection
            var fanCollection = db.get('fans');
            //user to be followed
            var following = req.params['0'];
            //current user username to update followed person's fan list
            var fan = currentUser.getUsername();
            fanCollection.insert({
                "fan": fan,
                "following": following
            });
            res.redirect(req.get('referer'));
        }
    });



}