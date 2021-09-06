const express = require('express');
const router = express.Router();
const ranks = require('../models/Rank.js');
const winston = require('../routes/logger'); // winston log 설정
module.exports = {
    
    getRankList : function (req,res,next){ //model의 doLoading 호출
        let kind = req.query.kind;

        ranks.getRankJson(kind).then((result)=>{
            let rows = {};
            if(result != null){
                rows = result.recordset;
                return res.json(rows);
            }else{
                return res.json({"id":"error"})
            }
        }).catch(function(e){
            console.log(e);
            return e;
        });
    }
}
