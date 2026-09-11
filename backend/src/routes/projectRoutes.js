import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

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
    if (isDbConnected()) {
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
    if (isDbConnected()) {
      const project = new Project(req.body);
      const saved = await project.save();
      return res.status(201).json(saved);
    }
    const saved = store.addProject(req.body);
    return res.status(201).json(saved);
  } catch (error) {
    const saved = store.addProject(req.body);
    return res.status(201).json(saved);
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updated) return res.json(updated);
    }
    return res.status(404).json({ message: 'Project update not supported in memory' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const deleted = await Project.findByIdAndDelete(req.params.id);
      if (deleted) return res.json({ message: 'Project deleted successfully' });
    }
    const deleted = store.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    return res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    const deleted = store.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    return res.json({ message: 'Project deleted successfully' });
  }
});

export default router;
