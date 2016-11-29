const mysql = require('mysql');

const pool = mysql.createPool({
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'root',
  password : process.env.DB_PASSWORD || '',
  database : process.env.DB_NAME || 'cpsc304_test',
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
  acquireTimeout: 1000000
});

module.exports = pool;

//mysql://be31dda3c3e395:4acda29e@us-cdbr-iron-east-04.cleardb.net/heroku_45ce7d2a9c653b9?reconnect=true