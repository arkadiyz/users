const express = require('express');
const logger = require('../../services/logger.service');
const { register } = require('./register.controller');

const router = express.Router();
router.post('/', register);

module.exports = router;
