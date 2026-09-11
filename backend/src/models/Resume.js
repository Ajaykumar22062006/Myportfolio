import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    fileType: { type: String, default: 'application/pdf' },
    base64Content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
