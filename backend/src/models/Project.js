import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, default: 'Software Project' },
    organization: { type: String, default: '' },
    duration: { type: String, default: '' },
    period: { type: String, default: '' },
    description: { type: String, required: true },
    category: { type: String, default: 'Full Stack' },
    technologies: [{ type: String }],
    features: [{ type: String }],
    packetTracerFeatures: [{ type: String }],
    githubUrl: { type: String, default: '[ADD YOUR INFORMATION]' },
    liveUrl: { type: String, default: '[ADD YOUR INFORMATION]' },
    certificateTitle: { type: String, default: '' },
    certificateType: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
