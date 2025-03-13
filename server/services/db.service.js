const mysql = require('mysql2');
require('dotenv').config();

const dbParams = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const conn = mysql.createPool({
  ...dbParams,
});

const db = conn.promise();

module.exports = db;
