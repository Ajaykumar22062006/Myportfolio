import express from 'express';
import mongoose from 'mongoose';
import Certificate from '../models/Certificate.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const certs = await Certificate.find().sort({ createdAt: -1 });
      return res.json(certs);
    }
    return res.json(store.getCertificates());
  } catch (error) {
    console.warn('[DB Fallback] Fetching certificates from in-memory store:', error.message);
    return res.json(store.getCertificates());
  }
});

router.post('/', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const cert = new Certificate(req.body);
      const saved = await cert.save();
      return res.status(201).json(saved);
    }
    const saved = store.addCertificate(req.body);
    return res.status(201).json(saved);
  } catch (error) {
    console.warn('[DB Fallback] Adding certificate to in-memory store:', error.message);
    const saved = store.addCertificate(req.body);
    return res.status(201).json(saved);
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      return res.json(updated);
    }
    const updated = store.updateCertificate(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Certificate not found' });
    return res.json(updated);
  } catch (error) {
    const updated = store.updateCertificate(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Certificate not found' });
    return res.json(updated);
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const deleted = await Certificate.findByIdAndDelete(req.params.id);
      if (deleted) {
        return res.json({ message: 'Certificate deleted successfully' });
      }
    }
    const deleted = store.deleteCertificate(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    return res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    const deleted = store.deleteCertificate(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    return res.json({ message: 'Certificate deleted successfully' });
  }
});

export default router;
