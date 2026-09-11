import express from 'express';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();
const isDbConnected = () => mongoose.connection.readyState === 1;

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = await Profile.create({});
      }
      return res.json(profile);
    }
    return res.json(store.getProfile());
  } catch (error) {
    return res.json(store.getProfile());
  }
});

router.put('/', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = new Profile(req.body);
      } else {
        Object.assign(profile, req.body);
      }
      const updated = await profile.save();
      return res.json(updated);
    }
    const updated = store.updateProfile(req.body);
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
