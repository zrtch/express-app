const mysql = require('mysql2/promise');

// 创建连接池（提高性能）
const pool = mysql.createPool({
  host: "localhost", // 数据库的IP地址(本地的或者是云服务器的都可以)
  user: "root",
  password: "123456",
  database: "test", //指定要操作哪个数据库
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;