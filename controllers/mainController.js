const express = require('express');
const router = express.Router();
const mains = require('../models/Main.js');
const winston = require('../routes/logger'); // winston log 설정
module.exports = {
  doLoading : function (req,res,next){ //model의 doLoading 호출
    mains.loadWeb().then((result)=>{
      winston.info(" : main controller");
        res.render('index');
    }).catch(function(e){
      console.log(e);
      return e;
    });
  }
}
