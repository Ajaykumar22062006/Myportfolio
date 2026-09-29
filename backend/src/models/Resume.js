import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    fileType: { type: String, default: 'application/pdf' },
    base64Content: { type: String, default: '' },
    url: { type: String, default: '' },
    blobUrl: { type: String, default: '' },
    isCurrent: { type: Boolean, default: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
