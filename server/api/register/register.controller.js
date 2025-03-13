const registerService = require('./register.service');
const logger = require('../../services/logger.service');

async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (firstname === '' || lastname === '' || email === '' || password === '')
      res.status(400).send({ message: 'Invalid parameters' });
    const isExist = await registerService.isUserExist(email);

    if (isExist) {
      res.status(409).send('User already exists');
    } else {
      const userId = await registerService.register(
        firstname,
        lastname,
        email,
        password
      );

      res.status(201).json({ message: 'User added successfully', userId });
    }
  } catch (error) {
    logger.error('[REGISTER] ' + error);
    res.status(500).send({ error });
  }
}

module.exports = {
  register,
};
