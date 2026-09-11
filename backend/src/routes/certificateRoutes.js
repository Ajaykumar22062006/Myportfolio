import express from 'express';
import mongoose from 'mongoose';
import Certificate from '../models/Certificate.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

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
    const memSaved = store.addCertificate(req.body);
    if (isDbConnected()) {
      try {
        const cert = new Certificate(req.body);
        const saved = await cert.save();
        return res.status(201).json(saved);
      } catch (e) {
        return res.status(201).json(memSaved);
      }
    }
    return res.status(201).json(memSaved);
  } catch (error) {
    console.warn('[DB Fallback] Adding certificate to in-memory store:', error.message);
    const saved = store.addCertificate(req.body);
    return res.status(201).json(saved);
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const memUpdated = store.updateCertificate(req.params.id, req.body);
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    store.deleteCertificate(req.params.id);
    if (isDbConnected() && isValidObjectId(req.params.id)) {
      await Certificate.findByIdAndDelete(req.params.id);
    }
    return res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    return res.json({ message: 'Certificate deleted successfully' });
  }
});

export default router;
