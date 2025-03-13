const express = require('express');
const requireAut = require('../../middlewares/requireAuth.middleware');

const { getUsers } = require('./users.controller');

const router = express.Router();

router.post('/', requireAut, getUsers);

module.exports = router;
