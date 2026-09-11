import dotenv from 'dotenv';
dotenv.config();
import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

import mongoose from 'mongoose';
import Project from './src/models/Project.js';

const updateProjects = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB Atlas');

    const projects = await Project.find();
    console.log(`Found ${projects.length} projects in MongoDB`);

    for (const proj of projects) {
      if (proj.title.toLowerCase().includes('hostel')) {
        proj.githubUrl = 'https://github.com/Ajaykumar22062006/hostel_management';
        proj.liveUrl = '';
        await proj.save();
        console.log(`Updated Hostel project: ${proj._id} (${proj.githubUrl})`);
      } else if (proj.title.toLowerCase().includes('network') || proj.category === 'Networking') {
        proj.githubUrl = 'https://github.com/Ajaykumar22062006/Network-monitoring-analysis-system';
        proj.liveUrl = '';
        await proj.save();
        console.log(`Updated Network project: ${proj._id} (${proj.githubUrl})`);
      }
    }

    console.log('DB Update complete');
    process.exit(0);
  } catch (err) {
    console.error('Error updating DB:', err);
    process.exit(1);
  }
};

updateProjects();
