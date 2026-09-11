import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Ajay Kumar D' },
    title: { type: String, default: 'Aspiring Full-Stack Developer' },
    subtitle: { type: String, default: 'Available for Full-Stack Opportunities' },
    bio: {
      type: String,
      default:
        'I build responsive web applications and practical software solutions using modern frontend, backend, database, and networking technologies.',
    },
    narrative: {
      type: String,
      default:
        'I am an aspiring Full-Stack Developer with a practical mindset centered on software engineering fundamentals, database architecture, and network communications.',
    },
    email: { type: String, default: 'ajay872072@gmail.com' },
    githubUrl: { type: String, default: 'https://github.com/Ajaykumar22062006' },
    linkedinUrl: {
      type: String,
      default:
        'https://www.linkedin.com/in/ajay-kumar-d-18377a292?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    },
    statusText: { type: String, default: 'Available for Full-Stack Opportunities' },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
