import express from 'express';
import mongoose from 'mongoose';
import Skill from '../models/Skill.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();
const isDbConnected = () => mongoose.connection.readyState === 1;

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const skills = await Skill.find().sort({ createdAt: -1 });
      return res.json(skills);
    }
    return res.json(store.getSkills());
  } catch (error) {
    return res.json(store.getSkills());
  }
});

router.post('/', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const skill = new Skill(req.body);
      const saved = await skill.save();
      return res.status(201).json(saved);
    }
    const saved = store.addSkill(req.body);
    return res.status(201).json(saved);
  } catch (error) {
    const saved = store.addSkill(req.body);
    return res.status(201).json(saved);
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updated) return res.json(updated);
    }
    const updated = store.updateSkill(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Skill not found' });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const deleted = await Skill.findByIdAndDelete(req.params.id);
      if (deleted) return res.json({ message: 'Skill deleted successfully' });
    }
    const deleted = store.deleteSkill(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Skill not found' });
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
