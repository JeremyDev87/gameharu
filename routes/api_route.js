var express = require('express');
var router = express.Router();
const winston = require('./logger'); // winston log 설정
const rankController = require('../controllers/rankController');

router.get('/', rankController.getRankList);

module.exports = router;
