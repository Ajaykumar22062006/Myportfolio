import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing!' });
  }

  try {
    const secret = process.env.JWT_SECRET || process.env.SECRET_KEY || 'ajay_fullstack_portfolio_secret_key_2026';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired!' });
  }
};
