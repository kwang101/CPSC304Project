const passport = require('passport');
const connection = require("../connection");
module.exports = function(app) {


  function renderLocationEditView(name, address, req, res) {
    connection.query('SELECT * from cpsc304_test.Location where name=? and address=?',
        [name, address],
        function(err, location) {
            res.render('editlocation', {
                title: 'Edit Location',
                message: 'Edit Location',
                userName: (req.user) ? req.user.username : undefined,
                flashMessage: req.flash('flashMessage'),
                location : location
            });
        });
  };

  function performLocationUpdate(column, name, address, newValue, req, res) {
    connection.query('UPDATE cpsc304_test.Location SET ' + column + '=? where name=? and address=?',
        [newValue, name, address],
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                if (column === "name") {
                    renderLocationEditView(newValue, address, req, res);
                } else if (column ==="address") {
                    renderLocationEditView(name, newValue, req, res);
                } else if (column === "capacity") {
                    renderLocationEditView(name, address, req, res);
                }
            }
        });
  };

  app.get('/editLocation/*', function(req, res) {
    console.log(req.params);
    var params = req.params['0'].split("-");
    var name = params[0];
    var address = params[1];
    renderLocationEditView(name, address, req, res);
  });

    app.post('/editLocation', function(req, res) {
        console.log(req.body);
        var params = req.body;
        if (req.body.name) {
            performLocationUpdate("name", params.oldName, params.oldAddress, params.name, req, res);
        } else if (req.body.address) {
            performLocationUpdate("address", params.oldName, params.oldAddress, params.address, req, res);
        } else if (req.body.capacity) {
            performLocationUpdate("capacity", params.oldName, params.oldAddress, params.capacity, req, res);
        }
    });
}