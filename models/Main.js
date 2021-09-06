// const { Conpool, sql, config } = require('../routes/dbConnection_bus.js'); //db 연결 설정 예시

module.exports = {
  loadWeb : function (){
    return new Promise ((resolve,reject)=>{
      // Promise 처리 ( 비동기 )
      // 여기에 DB 조회 및 기타 CRUD 처리
      // connect => 처리후 then => resolve 또는 reject 예외 처리
      // 아래 예시

        // var sqlstr = 'SELECT * from main_table with(nolock)';
        // sqlstr += '        where 1=1';
        // sql.connect(config).then(pool => {
        //     // Query
        //     return pool.request().query(sqlstr)
        // }).then(result => {
        //     resolve(result);
        // }).catch(err => {
        //     reject(err);
        //   // ... error checks
        // });
        resolve();
    });
  }
}
