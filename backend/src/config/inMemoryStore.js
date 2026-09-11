import crypto from 'crypto';

class InMemoryStore {
  constructor() {
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
        description: 'The University Hostel Management System is a web-based application that digitizes student registration, room allocation, fee management, and complaint tracking. It reduces manual work, improves transparency, and makes hostel administration faster and more efficient.',
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
        description: 'Developed a Flask-based Network Monitoring and Analysis System with device inventory, connectivity testing, subnet calculation, ARP/MAC analysis, and system logging.',
        technologies: ['Python (Flask)', 'SQLite', 'Cisco Packet Tracer', 'IPv4/IPv6', 'VLANs', 'DHCP', 'ARP'],
        githubUrl: 'https://github.com/Ajaykumar22062006/Network-monitoring-analysis-system',
        liveUrl: '',
        createdAt: new Date().toISOString(),
      },
    ];

    this.contactMessages = [];
    this.resume = null;
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
      skills: Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',').map(s=>s.trim()) : []),
      certificateImage: data.certificateImage || '',
      createdAt: new Date().toISOString(),
    };
    this.certificates.unshift(cert);
    return cert;
  }

  updateCertificate(id, data) {
    const idx = this.certificates.findIndex(c => c._id === id || c.id === id);
    if (idx === -1) return null;
    this.certificates[idx] = { ...this.certificates[idx], ...data };
    return this.certificates[idx];
  }

  deleteCertificate(id) {
    const idx = this.certificates.findIndex(c => c._id === id || c.id === id);
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
      createdAt: new Date().toISOString(),
    };
    this.projects.unshift(proj);
    return proj;
  }

  deleteProject(id) {
    const idx = this.projects.findIndex(p => p._id === id || p.id === id);
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
    const idx = this.contactMessages.findIndex(m => m._id === id || m.id === id);
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
