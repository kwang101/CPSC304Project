const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'cpsc304_test',
  multipleStatements: true
});

module.exports = pool;
