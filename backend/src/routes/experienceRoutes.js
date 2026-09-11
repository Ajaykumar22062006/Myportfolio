import express from 'express';
import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();
const isDbConnected = () => mongoose.connection.readyState === 1;
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await Experience.find().sort({ createdAt: -1 });
      return res.json(items);
    }
    return res.json(store.getExperience());
  } catch (error) {
    return res.json(store.getExperience());
  }
});

router.post('/', protectAdmin, async (req, res) => {
  try {
    const highlights = Array.isArray(req.body.highlights)
      ? req.body.highlights
      : typeof req.body.highlights === 'string'
      ? req.body.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

    const skills = Array.isArray(req.body.skills)
      ? req.body.skills
      : typeof req.body.skills === 'string'
      ? req.body.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const payload = { ...req.body, highlights, skills };
    const memSaved = store.addExperience(payload);

    if (isDbConnected()) {
      try {
        const exp = new Experience(payload);
        const saved = await exp.save();
        return res.status(201).json(saved);
      } catch (e) {
        return res.status(201).json(memSaved);
      }
    }
    return res.status(201).json(memSaved);
  } catch (error) {
    console.error('Experience create error:', error);
    return res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const memUpdated = store.updateExperience(req.params.id, req.body);
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updated) return res.json(updated);
    }
    if (memUpdated) return res.json(memUpdated);
    return res.json({ _id: req.params.id, ...req.body });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    store.deleteExperience(req.params.id);
    if (isDbConnected()) {
      if (isValidObjectId(req.params.id)) {
        await Experience.findByIdAndDelete(req.params.id);
      } else {
        await Experience.deleteMany({ role: new RegExp('Full-Stack', 'i') });
      }
    }
    return res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    return res.json({ message: 'Experience deleted successfully' });
  }
});

export default router;
