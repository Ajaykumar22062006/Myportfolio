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

const serveRawResumeFile = async (req, res, isDownload = false) => {
  try {
    let resume = null;
    if (isDbConnected()) {
      resume = await Resume.findOne({ isCurrent: true }).sort({ updatedAt: -1 });
      if (!resume) {
        resume = await Resume.findOne().sort({ updatedAt: -1 });
      }
    }
    if (!resume) {
      resume = store.getResume();
    }

    if (!resume || !resume.base64Content) {
      return res.status(404).json({ message: 'No resume file available' });
    }

    const base64Data = resume.base64Content.replace(/^data:.*?;base64,/, '').replace(/\s/g, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filename = resume.filename || 'ajay-resume.pdf';
    const mimeType = resume.fileType || 'application/pdf';

    const disposition = isDownload ? 'attachment' : 'inline';
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `${disposition}; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    return res.send(buffer);
  } catch (error) {
    return res.status(500).json({ message: 'Error serving resume file', error: error.message });
  }
};

router.get('/file', (req, res) => serveRawResumeFile(req, res, false));
router.get('/download', (req, res) => serveRawResumeFile(req, res, true));

const handleResumeUpload = async (req, res) => {
  try {
    const { filename, fileType, base64Content, blobUrl, url } = req.body || {};

    if (!filename || (!base64Content && !blobUrl && !url)) {
      return res.status(400).json({ message: 'Filename and content (base64Content or blobUrl) are required' });
    }

    const fileUrl = blobUrl || url || '';

    // Always update memory store as fallback
    store.saveResume({ filename, fileType, base64Content, url: fileUrl, blobUrl: fileUrl, isCurrent: true });

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

    const saved = store.getResume();
    return res.status(201).json({ message: 'Resume uploaded and stored in memory successfully!', data: saved });
  } catch (error) {
    const saved = store.saveResume(req.body);
    return res.status(201).json({ message: 'Resume uploaded successfully!', data: saved });
  }
};

router.post('/', protectAdmin, handleResumeUpload);
router.post('/upload', protectAdmin, handleResumeUpload);

export default router;
