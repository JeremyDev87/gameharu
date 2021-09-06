const sql = require('mssql');

//db global 변수 설정 예시
const config = {
  "user": "sa",
  "password": "h01562",
  "server": "172.20.30.219",
  "database": "gameharu",
  "port" : 1433,
  "options": {
      "encrypt": false
  },
  "multipleStatements": true
}

module.exports = {
  sql, config
}
