import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    college: { type: String, required: true },
    university: { type: String, default: '' },
    duration: { type: String, required: true },
    graduationYear: { type: String, default: '' },
    status: { type: String, default: 'In Progress' },
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Education', educationSchema);
