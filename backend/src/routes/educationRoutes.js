import express from 'express';
import mongoose from 'mongoose';
import Education from '../models/Education.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();
const isDbConnected = () => mongoose.connection.readyState === 1;

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await Education.find().sort({ createdAt: -1 });
      return res.json(items);
    }
    return res.json(store.getEducation());
  } catch (error) {
    return res.json(store.getEducation());
  }
});

router.post('/', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const edu = new Education(req.body);
      const saved = await edu.save();
      return res.status(201).json(saved);
    }
    const saved = store.addEducation(req.body);
    return res.status(201).json(saved);
  } catch (error) {
    const saved = store.addEducation(req.body);
    return res.status(201).json(saved);
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updated) return res.json(updated);
    }
    const updated = store.updateEducation(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Education not found' });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const deleted = await Education.findByIdAndDelete(req.params.id);
      if (deleted) return res.json({ message: 'Education deleted successfully' });
    }
    const deleted = store.deleteEducation(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Education not found' });
    return res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
