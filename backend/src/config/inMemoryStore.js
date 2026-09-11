import crypto from 'crypto';

class InMemoryStore {
  constructor() {
    this.profile = {
      name: 'Ajay Kumar D',
      title: 'Aspiring Full-Stack Developer',
      subtitle: 'Available for Full-Stack Opportunities',
      bio: 'I build responsive web applications and practical software solutions using modern frontend, backend, database, and networking technologies.',
      narrative: 'I am an aspiring Full-Stack Developer with a practical mindset centered on software engineering fundamentals, database architecture, and network communications.',
      email: 'ajay872072@gmail.com',
      githubUrl: 'https://github.com/Ajaykumar22062006',
      linkedinUrl: 'https://www.linkedin.com/in/ajay-kumar-d-18377a292?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      statusText: 'Available for Full-Stack Opportunities',
    };

    this.education = [
      {
        _id: 'edu_1',
        degree: 'Bachelor of Technology (B.Tech)',
        college: 'Jeppiaar Institute of Technology',
        university: 'Anna University',
        duration: '2023 – 2027',
        graduationYear: '2027',
        status: 'In Progress',
        highlights: [
          'Core coursework in Computer Science, Software Engineering & Data Structures',
          'Database Management Systems, Computer Networks & Operating Systems',
          'Full-Stack Web Development projects & industry practicals',
        ],
        createdAt: new Date().toISOString(),
      },
    ];

    this.skills = [
      { _id: 's1', category: 'Frontend', name: 'React.js', iconName: 'Code', level: 'Core' },
      { _id: 's2', category: 'Frontend', name: 'JavaScript (ES6+)', iconName: 'Code', level: 'Core' },
      { _id: 's3', category: 'Frontend', name: 'HTML5 & CSS3', iconName: 'Code', level: 'Core' },
      { _id: 's4', category: 'Frontend', name: 'Redux Toolkit', iconName: 'Code', level: 'Core' },

      { _id: 's5', category: 'Backend', name: 'Node.js Express', iconName: 'Server', level: 'Core' },
      { _id: 's6', category: 'Backend', name: 'Python (Flask)', iconName: 'Server', level: 'Core' },
      { _id: 's7', category: 'Backend', name: 'REST API Architecture', iconName: 'Server', level: 'Core' },
      { _id: 's8', category: 'Backend', name: 'JWT & Authentication', iconName: 'Server', level: 'Core' },

      { _id: 's9', category: 'Database', name: 'MongoDB & Mongoose', iconName: 'Database', level: 'Core' },
      { _id: 's10', category: 'Database', name: 'MySQL', iconName: 'Database', level: 'Core' },
      { _id: 's11', category: 'Database', name: 'SQLite', iconName: 'Database', level: 'Core' },

      { _id: 's12', category: 'Networking', name: 'Cisco Packet Tracer', iconName: 'Network', level: 'Core' },
      { _id: 's13', category: 'Networking', name: 'VLANs & 802.1Q Trunking', iconName: 'Network', level: 'Core' },
      { _id: 's14', category: 'Networking', name: 'IPv4 & Subnetting', iconName: 'Network', level: 'Core' },
      { _id: 's15', category: 'Networking', name: 'DHCP & ARP Analysis', iconName: 'Network', level: 'Core' },

      { _id: 's16', category: 'Tools', name: 'Git & GitHub', iconName: 'Wrench', level: 'Core' },
      { _id: 's17', category: 'Tools', name: 'Postman', iconName: 'Wrench', level: 'Core' },
      { _id: 's18', category: 'Tools', name: 'VS Code & Vite', iconName: 'Wrench', level: 'Core' },
    ];

    this.experience = [
      {
        _id: 'exp_1',
        role: 'Full-Stack Developer Intern',
        company: 'TCS iON Applied Industry Projects (AIP)',
        location: 'Remote',
        period: 'Feb 2026 – May 2026',
        type: 'Industry Internship',
        description:
          'Developed and implemented the University Hostel Management System digitizing student allocation, room records, fee payment tracking, and admin dashboards.',
        highlights: [
          'Engineered RESTful endpoints using Node.js, Express, and MongoDB Mongoose schemas.',
          'Built responsive React frontend dashboards with glassmorphism UI components and Redux Toolkit state.',
        ],
        skills: ['React.js', 'Node.js', 'Express', 'MongoDB'],
        createdAt: new Date().toISOString(),
      },
    ];

    this.certificates = [
      {
        _id: 'cert_tcs_ion_1',
        title: 'Certificate of Industry Project',
        subtitle: 'University Hostel Management System',
        organization: 'TCS iON Applied Industry Projects (AIP)',
        issueDate: '08 May 2026',
        type: 'tcs_ion',
        skills: ['Hostel Operations', 'Software System Architecture', 'Database Management'],
        certificateImage: '',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'cert_cisco_1',
        title: 'Certificate of Course Completion',
        subtitle: 'Networking Basics',
        organization: 'Cisco Networking Academy',
        issueDate: '13 August 2026',
        type: 'cisco',
        skills: ['Network communication', 'Ethernet', 'IPv4', 'IPv6', 'Routing', 'Network troubleshooting'],
        certificateImage: '',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'cert_infosys_1',
        title: 'Course Completion Certificate',
        subtitle: 'Learn SQL For Oracle Databases – Using Toad From Scratch',
        organization: 'Infosys Springboard',
        issueDate: '11 June 2025',
        type: 'infosys',
        skills: ['SQL Query Writing', 'Oracle Database', 'Toad IDE', 'Schema Design'],
        certificateImage: '',
        createdAt: new Date().toISOString(),
      },
    ];

    this.projects = [
      {
        _id: 'proj_tcs_1',
        title: 'University Hostel Management System',
        category: 'Full Stack',
        type: 'Industry Project',
        organization: 'TCS iON Applied Industry Projects (AIP)',
        duration: '3 Months',
        period: 'Feb 2026 – May 2026',
        description:
          'The University Hostel Management System is a web-based application that digitizes student registration, room allocation, fee management, and complaint tracking. It reduces manual work, improves transparency, and makes hostel administration faster and more efficient.',
        technologies: ['React.js', 'Node.js Express', 'MongoDB', 'Git'],
        githubUrl: 'https://github.com/Ajaykumar22062006/hostel_management',
        liveUrl: '',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'proj_cisco_1',
        title: 'Network Monitoring and Analysis System',
        category: 'Networking',
        type: 'Simulation Project',
        organization: 'Cisco Networking Academy Simulation',
        duration: '2 Months',
        period: 'Jul 2026 – Aug 2026',
        description:
          'Developed a Flask-based Network Monitoring and Analysis System with device inventory, connectivity testing, subnet calculation, ARP/MAC analysis, and system logging.',
        technologies: ['Python (Flask)', 'SQLite', 'Cisco Packet Tracer', 'IPv4/IPv6', 'VLANs', 'DHCP', 'ARP'],
        githubUrl: 'https://github.com/Ajaykumar22062006/Network-monitoring-analysis-system',
        liveUrl: '',
        createdAt: new Date().toISOString(),
      },
    ];

    this.contactMessages = [];
    this.resume = null;
  }

  // Profile Methods
  getProfile() {
    return this.profile;
  }
  updateProfile(data) {
    this.profile = { ...this.profile, ...data };
    return this.profile;
  }

  // Education Methods
  getEducation() {
    return this.education;
  }
  addEducation(data) {
    const item = {
      _id: 'edu_' + Date.now(),
      ...data,
      highlights: Array.isArray(data.highlights) ? data.highlights : (data.highlights ? data.highlights.split('\n').filter(Boolean) : []),
      createdAt: new Date().toISOString(),
    };
    this.education.unshift(item);
    return item;
  }
  updateEducation(id, data) {
    const idx = this.education.findIndex((e) => e._id === id || e.id === id);
    if (idx === -1) return null;
    const highlights = Array.isArray(data.highlights)
      ? data.highlights
      : data.highlights
      ? data.highlights.split('\n').filter(Boolean)
      : this.education[idx].highlights;
    this.education[idx] = { ...this.education[idx], ...data, highlights };
    return this.education[idx];
  }
  deleteEducation(id) {
    const idx = this.education.findIndex((e) => e._id === id || e.id === id);
    if (idx === -1) return false;
    this.education.splice(idx, 1);
    return true;
  }

  // Skill Methods
  getSkills() {
    return this.skills;
  }
  addSkill(data) {
    const item = {
      _id: 'skill_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.skills.unshift(item);
    return item;
  }
  updateSkill(id, data) {
    const idx = this.skills.findIndex((s) => s._id === id || s.id === id);
    if (idx === -1) return null;
    this.skills[idx] = { ...this.skills[idx], ...data };
    return this.skills[idx];
  }
  deleteSkill(id) {
    const idx = this.skills.findIndex((s) => s._id === id || s.id === id);
    if (idx === -1) return false;
    this.skills.splice(idx, 1);
    return true;
  }

  // Experience Methods
  getExperience() {
    return this.experience;
  }
  addExperience(data) {
    const item = {
      _id: 'exp_' + Date.now(),
      ...data,
      highlights: Array.isArray(data.highlights) ? data.highlights : (data.highlights ? data.highlights.split('\n').filter(Boolean) : []),
      skills: Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',').map((s) => s.trim()) : []),
      createdAt: new Date().toISOString(),
    };
    this.experience.unshift(item);
    return item;
  }
  updateExperience(id, data) {
    const idx = this.experience.findIndex((e) => e._id === id || e.id === id);
    if (idx === -1) return null;
    const highlights = Array.isArray(data.highlights)
      ? data.highlights
      : data.highlights
      ? data.highlights.split('\n').filter(Boolean)
      : this.experience[idx].highlights;
    const skills = Array.isArray(data.skills)
      ? data.skills
      : data.skills
      ? data.skills.split(',').map((s) => s.trim())
      : this.experience[idx].skills;
    this.experience[idx] = { ...this.experience[idx], ...data, highlights, skills };
    return this.experience[idx];
  }
  deleteExperience(id) {
    const idx = this.experience.findIndex((e) => e._id === id || e.id === id);
    if (idx === -1) return false;
    this.experience.splice(idx, 1);
    return true;
  }

  // Certificate Methods
  getCertificates() {
    return this.certificates;
  }
  addCertificate(data) {
    const cert = {
      _id: 'cert_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      title: data.title || 'Certificate',
      subtitle: data.subtitle || '',
      organization: data.organization || 'Organization',
      issueDate: data.issueDate || '2026',
      type: data.type || 'cisco',
      skills: Array.isArray(data.skills) ? data.skills : data.skills ? data.skills.split(',').map((s) => s.trim()) : [],
      certificateImage: data.certificateImage || '',
      createdAt: new Date().toISOString(),
    };
    this.certificates.unshift(cert);
    return cert;
  }
  updateCertificate(id, data) {
    const idx = this.certificates.findIndex((c) => c._id === id || c.id === id);
    if (idx === -1) return null;
    const skills = Array.isArray(data.skills) ? data.skills : data.skills ? data.skills.split(',').map((s) => s.trim()) : this.certificates[idx].skills;
    this.certificates[idx] = { ...this.certificates[idx], ...data, skills };
    return this.certificates[idx];
  }
  deleteCertificate(id) {
    const idx = this.certificates.findIndex((c) => c._id === id || c.id === id);
    if (idx === -1) return false;
    this.certificates.splice(idx, 1);
    return true;
  }

  // Project Methods
  getProjects() {
    return this.projects;
  }
  addProject(data) {
    const proj = {
      _id: 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      ...data,
      technologies: Array.isArray(data.technologies)
        ? data.technologies
        : data.technologies
        ? data.technologies.split(',').map((t) => t.trim())
        : [],
      createdAt: new Date().toISOString(),
    };
    this.projects.unshift(proj);
    return proj;
  }
  updateProject(id, data) {
    const idx = this.projects.findIndex((p) => p._id === id || p.id === id);
    if (idx === -1) return null;
    const technologies = Array.isArray(data.technologies)
      ? data.technologies
      : data.technologies
      ? data.technologies.split(',').map((t) => t.trim())
      : this.projects[idx].technologies;
    this.projects[idx] = { ...this.projects[idx], ...data, technologies };
    return this.projects[idx];
  }
  deleteProject(id) {
    const idx = this.projects.findIndex((p) => p._id === id || p.id === id);
    if (idx === -1) return false;
    this.projects.splice(idx, 1);
    return true;
  }

  // Contact Methods
  getContactMessages() {
    return this.contactMessages;
  }
  addContactMessage(data) {
    const msg = {
      _id: 'msg_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.unshift(msg);
    return msg;
  }
  deleteContactMessage(id) {
    const idx = this.contactMessages.findIndex((m) => m._id === id || m.id === id);
    if (idx === -1) return false;
    this.contactMessages.splice(idx, 1);
    return true;
  }

  // Resume Methods
  getResume() {
    return this.resume;
  }
  saveResume(data) {
    this.resume = {
      _id: 'resume_active',
      filename: data.filename,
      fileType: data.fileType,
      base64Content: data.base64Content,
      updatedAt: new Date().toISOString(),
    };
    return this.resume;
  }
}

export const store = new InMemoryStore();
