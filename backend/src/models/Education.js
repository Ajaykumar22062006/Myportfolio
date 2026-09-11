import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    department: { type: String, default: '' },
    college: { type: String, required: true },
    university: { type: String, default: '' },
    duration: { type: String, required: true },
    graduationYear: { type: String, default: '' },
    status: { type: String, default: 'In Progress' },
    cgpa: { type: String, default: '' },
    percentage: { type: String, default: '' },
    result: { type: String, default: '' },
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Education', educationSchema);
