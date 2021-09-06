var express = require('express');
var router = express.Router();
const winston = require('./logger'); // winston log 설정
const mainController = require('../controllers/mainController');

router.get('/', mainController.doLoading);

module.exports = router;
