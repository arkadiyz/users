const db = require('../../services/db.service');

async function getUsers(res) {
  try {
    const sql = 'SELECT email, firstname, lastname FROM users ';
    const [results] = await db.query(sql);
    return results.length > 0 ? results : [];
  } catch (error) {}
}
module.exports = {
  getUsers,
};
