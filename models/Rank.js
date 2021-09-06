const { sql, config } = require('../routes/dbConnection.js'); //db 연결


module.exports = {
    getRankJson : function (kind){
        return new Promise ((resolve,reject)=>{
        // Promise 처리 ( 비동기 )
        // 여기에 DB 조회 및 기타 CRUD 처리
        // connect => 처리후 then => resolve 또는 reject 예외 처리
        // 아래 예시

            var sqlstr = "select ranking,name,point,created_dt from tb_rank where kind ='"+kind+"' order by ranking asc ";
            sql.connect(config).then(pool => {
                return pool.request().query(sqlstr)
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
