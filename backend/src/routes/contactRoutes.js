import express from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import { protectAdmin } from '../middleware/auth.js';
import { store } from '../config/inMemoryStore.js';

const router = express.Router();
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All contact fields are required' });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ message: 'Message must be at least 10 characters long' });
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    const memSaved = store.addContactMessage(payload);

    try {
      const newContact = new Contact(payload);
      const saved = await newContact.save();
      return res.status(201).json({ message: 'Message sent successfully!', data: saved });
    } catch (dbErr) {
      return res.status(201).json({ message: 'Message sent successfully!', data: memSaved });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error submitting contact form: ${error.message}` });
  }
});

router.get('/', protectAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return res.json(store.getContactMessages());
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    store.deleteContactMessage(req.params.id);
    if (isValidObjectId(req.params.id)) {
      await Contact.findByIdAndDelete(req.params.id);
    }
    return res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    return res.json({ message: 'Message deleted successfully' });
  }
});

export default router;
