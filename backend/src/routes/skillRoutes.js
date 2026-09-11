import express from 'express';
import mongoose from 'mongoose';
import Skill from '../models/Skill.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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
    const memSaved = store.addSkill(req.body);
    if (isDbConnected()) {
      try {
        const skill = new Skill(req.body);
        const saved = await skill.save();
        return res.status(201).json(saved);
      } catch (e) {
        return res.status(201).json(memSaved);
      }
    }
    return res.status(201).json(memSaved);
  } catch (error) {
    const saved = store.addSkill(req.body);
    return res.status(201).json(saved);
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const memUpdated = store.updateSkill(req.params.id, req.body);
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    store.deleteSkill(req.params.id);
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      await Skill.findByIdAndDelete(req.params.id);
    }
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    return res.json({ message: 'Skill deleted successfully' });
  }
});

export default router;
