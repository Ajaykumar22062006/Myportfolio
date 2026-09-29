import express from 'express';
import mongoose from 'mongoose';
import Resume from '../models/Resume.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();

const isDbConnected = () => mongoose.connection.readyState === 1;

router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      let resume = await Resume.findOne({ isCurrent: true }).sort({ updatedAt: -1 });
      if (!resume) {
        resume = await Resume.findOne().sort({ updatedAt: -1 });
      }
      if (resume) return res.json(resume);
    }
    const memResume = store.getResume();
    if (!memResume) return res.status(404).json({ message: 'No resume uploaded yet' });
    return res.json(memResume);
  } catch (error) {
    const memResume = store.getResume();
    if (!memResume) return res.status(404).json({ message: 'No resume uploaded yet' });
    return res.json(memResume);
  }
});

const handleResumeUpload = async (req, res) => {
  try {
    const { filename, fileType, base64Content, blobUrl, url } = req.body || {};

    if (!filename || (!base64Content && !blobUrl && !url)) {
      return res.status(400).json({ message: 'Filename and content (base64Content or blobUrl) are required' });
    }

    const fileUrl = blobUrl || url || '';

    if (isDbConnected()) {
      await Resume.updateMany({}, { isCurrent: false });
      const newResume = new Resume({
        filename,
        fileType: fileType || 'application/pdf',
        base64Content: base64Content || '',
        url: fileUrl,
        blobUrl: fileUrl,
        isCurrent: true,
        uploadedAt: new Date(),
      });

      const saved = await newResume.save();
      return res.status(201).json({ message: 'Resume uploaded and stored in database successfully!', data: saved });
    }

    const saved = store.saveResume({ filename, fileType, base64Content, url: fileUrl, blobUrl: fileUrl, isCurrent: true });
    return res.status(201).json({ message: 'Resume uploaded and stored in memory successfully!', data: saved });
  } catch (error) {
    const saved = store.saveResume(req.body);
    return res.status(201).json({ message: 'Resume uploaded successfully!', data: saved });
  }
};

router.post('/', protectAdmin, handleResumeUpload);
router.post('/upload', protectAdmin, handleResumeUpload);

export default router;
