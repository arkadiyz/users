const logger = require('../../services/logger.service');
const bcrypt = require('bcryptjs');
const db = require('../../services/db.service');
const jwt = require('jsonwebtoken');

async function login(email, password, res) {
  try {
    if (!email || !password)
      throw new Error('email and password are required!');
    const sql =
      'SELECT id, firstname, lastname, password FROM users WHERE email = ?';
    const [results] = await db.query(sql, [email]);
    if (results.length === 0) throw new Error('Invalid email or password');
    else if (results.length > 0) {
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        const token = generateToken(results[0].id, results[0].email);
        const user = results[0];
        delete user.password;
        user.token = token;
        return results[0];
      } else {
        throw new Error('Invalid email or password');
      }
    }
  } catch (error) {
    logger.error('[auth.server] login ' + error);
    res.status(401).send(error.message);
  }
}

async function logout(res) {}

function generateToken(userId, email) {
  return jwt.sign({ id: userId, email: email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

module.exports = {
  login,
  logout,
};
