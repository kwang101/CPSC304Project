const connection    = require('../connection.js');

module.exports = function(app) {
    return {
        getAllUsers: function(cb){
            connection.query("SELECT * FROM User",
                function(err, rows) {
                    if (err)
                        return cb(err);

                    return cb(null, rows)
                });
        },
        getUserById: function(id, cb){
            connection.query("SELECT * FROM User WHERE userId = ?",
                [id],
                function(err, rows) {
                    if (err)
                        return cb(err);

                    return cb(null, rows)
                });
        },
        deleteUser: function(id, cb){
            connection.query("DELETE FROM User WHERE userId = ?",
                [id],
                function(err, rows) {
                    if (err)
                        return cb(err);

                    return cb(null, rows)
                });
        },
        
    }
};