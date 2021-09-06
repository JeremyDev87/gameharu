var express = require('express');
var router = express.Router();
const winston = require('./logger'); // winston log 설정
const heroHaruController = require('../controllers/heroHaruController');

router.get('/', heroHaruController.doLoading);

module.exports = router;
