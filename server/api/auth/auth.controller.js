const authService = require('./auth.service');
const logger = require('../../services/logger.service');

async function login(req, res) {
  const { email, password } = req.body;

  const user = await authService.login(email, password, res);
  if (user) {
    res.cookie('token', user.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
    delete user.token;
    res.json(user);
  }
}

async function logout(req, res) {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false, // true for https 
      sameSite: 'Lax', 
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('error');
    res.status(401).send({ error: '' + error });
  }
}

async function islogin(req, res) {
  try {
    res.status(200).send();
  } catch (error) {
    res.status(401).send({ error: '' + error });
  }
}

module.exports = {
  login,
  logout,
  islogin,
};
