import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';

import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import certificateRoutes from './src/routes/certificateRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import resumeRoutes from './src/routes/resumeRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import educationRoutes from './src/routes/educationRoutes.js';
import skillRoutes from './src/routes/skillRoutes.js';
import experienceRoutes from './src/routes/experienceRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Ajay Kumar D Portfolio Node Express REST API' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Node Express REST API running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Freeing port or specify a different PORT in .env`);
  } else {
    console.error('❌ Server error:', err);
  }
});
