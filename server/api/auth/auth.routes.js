const express = require('express');
const requireAut = require('../../middlewares/requireAuth.middleware');
const loggerService = require('../../services/logger.service');

const { login, logout, islogin } = require('./auth.controller');

const router = express.Router();

router.post('/login', login);
router.post('/logout', requireAut, logout);
router.post('/islogin', requireAut, islogin);

module.exports = router;
