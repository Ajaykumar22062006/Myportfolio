import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // 'Frontend', 'Backend', 'Database', 'Networking', 'Tools'
    iconName: { type: String, default: '' },
    level: { type: String, default: 'Practitioner' },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
