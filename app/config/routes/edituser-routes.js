const passport = require('passport');
const connection = require("../connection");
module.exports = function(app) {


  function renderUserEditView(userId, req, res) {
    connection.query('SELECT * from cpsc304_test.User where userId=?',
        [userId],
        function(err, user) {
            res.render('edituser', {
                title: 'Edit User',
                message: 'Edit User',
                userName: (req.user) ? req.user.username : undefined,
                flashMessage: req.flash('flashMessage'),
                user : user
            });
        });
  };

  function performUserUpdate(column, userId, newValue, req, res) {
    connection.query('UPDATE cpsc304_test.User SET ' + column + '=? where userId=?',
        [newValue, userId],
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                renderUserEditView(userId, req, res);
            }
        });
  };

  app.get('/editUser/*', function(req, res) {
    console.log(req.params);
    var userId = req.params['0'];
    renderUserEditView(userId, req, res);
  });

    app.post('/editUser', function(req, res) {
        console.log(req.body);
        var params = req.body;
        if (req.body.name) {
            performUserUpdate("name", params.userId, params.name, req, res);
        } else if (req.body.email) {
            performUserUpdate("email", params.userId, params.email, req, res);
        } else if (req.body.isAdmin) {
            performUserUpdate("isAdmin", params.userId, params.isAdmin, req, res);
        } else if (req.body.isInstructor) {
            performUserUpdate("isInstructor", params.userId, params.isInstructor, req, res);
        } else if (req.body.isUBC) {
            performUserUpdate("isUBC", params.userId, params.isUBC, req, res);
        } else if (req.body.creditCard) {
            performUserUpdate("creditCard", params.userId, params.creditCard, req, res);
        } else if (req.body.expiryDate) {
            performUserUpdate("expiryDate", params.userId, params.expiryDate, req, res);
        }
    });
}