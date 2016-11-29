const mysql = require('mysql');

const pool = mysql.createPool({
  host     : process.env.DB_HOST,
  user     : process.env.DB_NAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  multipleStatements: true
});

module.exports = pool;
