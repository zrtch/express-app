const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 获取所有用户
router.get('/', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取单个用户
router.get('/:id', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 创建用户
router.post('/', async (req, res) => {
  const { username, email } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(400).json({ error: 'Duplicate entry or invalid data' });
  }
});

// 更新用户
router.put('/:id', async (req, res) => {
  const { username, email } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [username, email, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json({ message: '用户更新成功' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    
    res.json({ message: '用户删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;