import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (username === adminUser && password === adminPass) {
      const secret = process.env.SECRET_KEY || 'ajay_fullstack_portfolio_secret_key_2026';
      const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '7d' });

      return res.json({
        message: 'Login successful',
        token,
        user: { username, role: 'admin' },
      });
    }

    return res.status(401).json({ message: 'Invalid username or password' });
  } catch (error) {
    return res.status(500).json({ message: `Server login error: ${error.message}` });
  }
});

export default router;
