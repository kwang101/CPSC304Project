const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'cpsc304database.ciatblhwhxlk.us-west-2.rds.amazonaws.com',
  port     : '3306',
  user     : 'geordiep',
  password : 'database',
  database : 'cpsc304',
  multipleStatements: true
});

module.exports = pool;
