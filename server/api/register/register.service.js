const logger = require('../../services/logger.service');
const bcrypt = require('bcryptjs');
const db = require('../../services/db.service');

async function isUserExist(email) {
  try {
    const sql = `SELECT 1 FROM users WHERE email = ?`;
    const [result] = await db.query(sql, [email]);
    logger.info('[result] ' + result.length);

    return result.length || 0;
  } catch (error) {
    logger.error('[isUserExist REGISTER] ' + error);
  }
}

async function register(firstName, lastName, email, password) {
  try {
    const insertSql = `INSERT INTO users (firstName, lastName, email, password) 
     VALUES  (?,?,?,?) `;

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.query(insertSql, [
      firstName,
      lastName,
      email,
      hashedPassword,
    ]);

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  isUserExist,
};
