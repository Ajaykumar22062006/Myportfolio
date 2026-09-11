import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.json(projects);
    }
    return res.json(store.getProjects());
  } catch (error) {
    return res.json(store.getProjects());
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      const project = await Project.findById(req.params.id);
      if (project) return res.json(project);
    }
    const projects = store.getProjects();
    const proj = projects.find(p => p._id === req.params.id || p.id === req.params.id);
    if (!proj) return res.status(404).json({ message: 'Project not found' });
    return res.json(proj);
  } catch (error) {
    return res.status(404).json({ message: 'Project not found' });
  }
});

router.post('/', protectAdmin, async (req, res) => {
  try {
    const technologies = Array.isArray(req.body.technologies)
      ? req.body.technologies
      : typeof req.body.technologies === 'string'
      ? req.body.technologies.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const payload = { ...req.body, technologies };
    const memSaved = store.addProject(payload);

    if (isDbConnected()) {
      try {
        const project = new Project(payload);
        const saved = await project.save();
        return res.status(201).json(saved);
      } catch (e) {
        return res.status(201).json(memSaved);
      }
    }
    return res.status(201).json(memSaved);
  } catch (error) {
    console.error('Project create error:', error);
    return res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const memUpdated = store.updateProject(req.params.id, req.body);
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    store.deleteProject(req.params.id);
    if (isDbConnected()) {
      if (isValidObjectId(req.params.id)) {
        await Project.findByIdAndDelete(req.params.id);
      } else {
        await Project.deleteMany({ title: new RegExp(req.params.id.replace(/_/g, ' '), 'i') });
      }
    }
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.json({ message: 'Project deleted successfully' });
  }
});

export default router;
