const mysql = require('mysql');
const pool = mysql.createPool({
  host     : process.env.DB_HOST || 'localhost', //'sulnwdk5uwjw1r2k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : process.env.DB_USER || 'root', //'g89pjlxdyo776ioi',
  password : process.env.DB_PASSWORD || '', //'ok8pai8mvwqhn5ck',
  database : process.env.DB_NAME || 'cpsc304_test', //'okep5tr7f8lcolsi',
  port: process.env.DB_PORT || '3306',
  debug: true,
  multipleStatements: true
});

module.exports = pool;

//mysql://be31dda3c3e395:4acda29e@us-cdbr-iron-east-04.cleardb.net/heroku_45ce7d2a9c653b9?reconnect=true