const logger = require('../services/logger.service');
require('dotenv').config();
const jwt = require('jsonwebtoken');

async function requireAuth(req, res, next) {
  const token = req.cookies.token; // שליפת ה-JWT מה-Cookie

  if (!token) {
    return res.status(401).json('No Token, authorization denied');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json('Invalid Token');
      }
      req.user = user; // הוספת פרטי המשתמש לבקשה
      next(); // ממשיך לנתיב הבא
    });
  } catch (error) {
    res.status(401).json('Invalid token');
  }
}

async function requireAdmin() {
  const user = req.session.user;
  if (!user.isAdmin) {
    res.status(403).end('Unauthorized Enough..');
    return;
  }
  next();
}

module.exports = requireAuth;
