const connection    = require('../connection.js');

module.exports = function(app) {
    return {
        getAllUsers: function(cb){
            connection.query("SELECT * FROM users",
                function(err, rows) {
                    if (err)
                        return cb(err);

                    return cb(null, rows)
                });
        },
        getUserById: function(id, cb){
            connection.query("SELECT * FROM users WHERE id = :id",
                { id: id },
                function(err, rows) {
                    if (err)
                        return cb(err);

                    return cb(null, rows)
                });
        },
        deleteUser: function(id, cb){
            connection.query("DELETE FROM users WHERE id = :id",
                { id: id },
                function(err, rows) {
                    if (err)
                        return cb(err);

                    return cb(null, rows)
                });
        },
        updateUser: function(user, cb){
            connection.query('UPDATE users SET id = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', user.id],
                { id: id },
                function(err, rows) {
                    if (err)
                        return cb(err);

                    return cb(null, rows)
                });
        },
        
    }
};