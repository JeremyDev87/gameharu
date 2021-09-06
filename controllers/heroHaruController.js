const express = require('express');
const router = express.Router();
const ranks = require('../models/Rank.js');
const winston = require('../routes/logger'); // winston log 설정
module.exports = {
  doLoading : function (req,res,next){ //model의 doLoading 호출
    ranks.loadWeb().then((result)=>{
        res.render('heroharu');
    }).catch(function(e){
      console.log(e);
      return e;
    });
  }
}
