const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/db'); // 添加数据库连接池引入
const app = express();

// 中间件配置
app.use(bodyParser.json());
app.use(cors());

// 添加静态文件服务
app.use(express.static('public'));

// 引入路由
const userRoutes = require('./routes/users');

// 使用路由
app.use('/api/users', userRoutes);

// 定义端口
const PORT = process.env.PORT || 3000;

// 启动服务
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

// 在 app.js 中添加测试路由
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ status: 'success', data: rows[0].solution });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});