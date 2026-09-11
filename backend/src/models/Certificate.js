import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    organization: { type: String, required: true },
    issueDate: { type: String, default: '' },
    type: { type: String, default: 'cisco' },
    skills: [{ type: String }],
    certificateImage: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Certificate', certificateSchema);
