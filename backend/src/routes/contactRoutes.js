import express from 'express';
import Contact from '../models/Contact.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All contact fields are required' });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ message: 'Message must be at least 10 characters long' });
    }

    const newContact = new Contact({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    const saved = await newContact.save();
    return res.status(201).json({ message: 'Message sent successfully!', data: saved });
  } catch (error) {
    return res.status(500).json({ message: `Error submitting contact form: ${error.message}` });
  }
});

router.get('/', protectAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: `Error fetching messages: ${error.message}` });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: `Error deleting message: ${error.message}` });
  }
});

export default router;
