import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: '' },
    period: { type: String, required: true },
    type: { type: String, default: 'Internship / Experience' },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    skills: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);
