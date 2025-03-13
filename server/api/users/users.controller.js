const db = require('../../services/db.service');
const userService = require('./users.service');

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send();
  }
}

module.exports = {
  getUsers,
};
