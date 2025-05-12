## 项目结构

```plaintext
express-app/

├── app.js                #  应用程序入口文件
├── config/               #  配置文件目录
│   └── db.js             #  数据库连接配置
├── public/               #  静态资源目录
│   ├── css/              # CSS  样式文件
│   │   └── style.css     #  主样式文件
│   └── index.html        #  前端页面
├── routes/               #  路由目录
│   └── users.js          #  用户相关路由
├── .gitignore            # Git  忽略文件
└── package.json          #  项目依赖配置
```

## 技术栈

- 后端 ：

  - Node.js
  - Express.js (^5.1.0)
  - MySQL2 (^3.14.1)
  - Body-parser (^2.2.0)
  - CORS (^2.8.5)

- 前端 ：

  - HTML5
  - CSS3
  - JavaScript (原生)
  - Fetch API

- 开发工具 ：

  - Nodemon (^3.1.10)

## 功能特性

- 用户管理（增删改查）
- 数据库连接状态检测
- 响应式界面设计
- RESTful API 设计
- 错误处理和用户反馈

### 前提条件

- Node.js (推荐 v14 或更高版本)
- MySQL 服务器
- 配置数据库：
  - 确保 MySQL 服务已启动
  - 在 config/db.js 中配置正确的数据库连接信息
  - 创建 users 表：

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);
```

访问应用：在浏览器中打开 http://localhost:3000

## 核心知识点

### 1. Express 服务器搭建

```js
// app.js 中的关键代码
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pool = require('./config/db')
const app = express()

// 中间件配置
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

// 定义端口
const PORT = process.env.PORT || 3000

// 启动服务
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})
```

- Express 应用程序初始化
- 中间件的使用（body-parser, cors）
- 静态文件服务配置
- 服务器监听端口设置

### 2.MySQL 数据库连接

```js
// config/db.js
const mysql = require('mysql2/promise')

// 创建连接池（提高性能）
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool
```

- MySQL2 连接池配置
- 数据库连接参数设置
- 使用连接池提高性能
- 模块导出

### 3. RESTful API 设计

```js
// routes/users.js 中的路由定义
// 获取所有用户
router.get('/', async (req, res) => {
  /* ... */
})

// 获取单个用户
router.get('/:id', async (req, res) => {
  /* ... */
})

// 创建用户
router.post('/', async (req, res) => {
  /* ... */
})

// 更新用户
router.put('/:id', async (req, res) => {
  /* ... */
})

// 删除用户
router.delete('/:id', async (req, res) => {
  /* ... */
})
```

- RESTful API 设计原则
- Express 路由定义
- HTTP 方法对应的 CRUD 操作
- 路由参数获取
- 异步处理（async/await）

### 4. 数据库操作

```js
// 查询示例
const [users] = await pool.query('SELECT * FROM users')

// 插入示例
const [result] = await pool.query(
  'INSERT INTO users (username, email) VALUES (?, ?)',
  [username, email],
)

// 更新示例
const [result] = await pool.query(
  'UPDATE users SET username = ?, email = ? WHERE id = ?',
  [username, email, req.params.id],
)

// 删除示例
const [result] = await pool.query('DELETE FROM users WHERE id = ?', [
  req.params.id,
])
```

- SQL 查询语句
- 参数化查询（防止 SQL 注入）
- 解构赋值获取查询结果
- 异步数据库操作

### 5. 前端 Fetch API 使用

```js
// 获取数据示例
async function fetchUsers() {
  try {
    const response = await fetch('/api/users')
    const users = await response.json()
    // 处理数据
  } catch (error) {
    // 错误处理
  }
}

// 发送数据示例
async function createUser(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    // 处理响应
  } catch (error) {
    // 错误处理
  }
}
```

- Fetch API 基本用法
- 异步/等待（async/await）
- HTTP 请求方法设置
- 请求头和请求体配置
- JSON 数据处理
- 错误处理

后续扩展：

1. 身份验证与授权 ：

   - 添加用户登录/注册功能
   - 实现 JWT 认证
   - 添加权限控制

2. 数据验证 ：

   - 使用 Joi 或 express-validator 进行请求数据验证

3. ORM 集成 ：

   - 使用 Sequelize 或 TypeORM 替代原生 SQL 查询

4. 前端框架集成 ：

   - 使用 React, Vue 或 Angular 重构前端

5. 测试 ：

   - 添加单元测试和集成测试
   - 使用 Jest, Mocha 等测试框架

6. 部署 ：

   - 学习如何部署到云服务器
   - 配置 Nginx 反向代理
   - 设置 PM2 进程管理
