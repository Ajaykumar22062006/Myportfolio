import express from 'express';
import mongoose from 'mongoose';
import Education from '../models/Education.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();
const isDbConnected = () => mongoose.connection.readyState === 1;
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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
    const highlights = Array.isArray(req.body.highlights)
      ? req.body.highlights
      : typeof req.body.highlights === 'string'
      ? req.body.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

    const payload = { ...req.body, highlights };
    const memSaved = store.addEducation(payload);

    if (isDbConnected()) {
      try {
        const edu = new Education(payload);
        const saved = await edu.save();
        return res.status(201).json(saved);
      } catch (dbErr) {
        return res.status(201).json(memSaved);
      }
    }
    return res.status(201).json(memSaved);
  } catch (error) {
    console.error('Education create error:', error);
    return res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const highlights = Array.isArray(req.body.highlights)
      ? req.body.highlights
      : typeof req.body.highlights === 'string'
      ? req.body.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
      : undefined;

    const payload = { ...req.body };
    if (highlights !== undefined) payload.highlights = highlights;

    const memUpdated = store.updateEducation(req.params.id, payload);

    if (isDbConnected() && isValidObjectId(req.params.id)) {
      const updated = await Education.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: false });
      if (updated) return res.json(updated);
    }

    if (memUpdated) return res.json(memUpdated);
    return res.json({ _id: req.params.id, ...payload });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    store.deleteEducation(req.params.id);
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      await Education.findByIdAndDelete(req.params.id);
    }
    return res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
