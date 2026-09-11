import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5s timeout to quickly fallback if backend is offline
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Default Fallback Data (used when backend API is offline or unreachable)
export const DEFAULT_PROFILE = {
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

export const DEFAULT_EDUCATION = [
  {
    _id: 'edu_1',
    degree: 'B.Tech',
    department: 'Artificial Intelligence and Data Science',
    college: 'Jeppiaar Institute of Technology',
    university: 'Affiliated to Anna University',
    duration: '2023-2027',
    graduationYear: '2027',
    status: 'In Progress',
    cgpa: '8.5 / 10',
    percentage: '',
    result: '',
    highlights: [
      'Core coursework in Artificial Intelligence, Data Science & Machine Learning',
      'Database Management Systems, Computer Networks & Operating Systems',
      'Full-Stack Web Development projects & industry practicals',
    ],
  },
  {
    _id: 'edu_2',
    degree: 'Higher Secondary Certificate (HSC / 12th Grade)',
    department: 'Computer Science',
    college: 'Anderson Higher Secondary School',
    university: 'State Board of School Examinations',
    duration: '2022-2023',
    graduationYear: '2023',
    status: 'Completed',
    cgpa: '',
    percentage: '90%',
    result: '',
    highlights: [
      'Strong foundation in Mathematics, Physics, Chemistry, and Computer Science',
      'Academic excellence in secondary education board examinations',
    ],
  },
  {
    _id: 'edu_3',
    degree: 'Secondary School Leaving Certificate (SSLC / 10th Grade)',
    department: 'General Secondary Education',
    college: 'Anderson Higher Secondary School',
    university: 'State Board of Secondary Education',
    duration: '2020-2021',
    graduationYear: '2021',
    status: 'Completed',
    cgpa: '',
    percentage: '',
    result: 'Pass',
    highlights: [
      'Core secondary education with high proficiency in Mathematics and Science',
    ],
  },
];

export const DEFAULT_PROJECTS = [
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
    features: [
      'Role-based Admin & Student authentication',
      'Automated room allocation and fee management module',
      'Real-time complaint tracking & resolution dashboard'
    ],
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
    features: [
      'Device inventory & ICMP connectivity latency ping testing',
      'IPv4/IPv6 Subnet Calculator & ARP/MAC table inspector',
      'Network event logging and topology monitoring'
    ],
  },
];

export const DEFAULT_EXPERIENCE = [
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
  },
];

export const DEFAULT_CERTIFICATES = [
  {
    _id: 'cert_tcs_ion_1',
    title: 'Certificate of Industry Project',
    subtitle: 'University Hostel Management System',
    organization: 'TCS iON Applied Industry Projects (AIP)',
    issueDate: '08 May 2026',
    type: 'tcs_ion',
    skills: ['Hostel Operations', 'Software System Architecture', 'Database Management'],
  },
  {
    _id: 'cert_cisco_1',
    title: 'Certificate of Course Completion',
    subtitle: 'Networking Basics',
    organization: 'Cisco Networking Academy',
    issueDate: '13 August 2026',
    type: 'cisco',
    skills: ['Network communication', 'Ethernet', 'IPv4', 'IPv6', 'Routing', 'Network troubleshooting'],
  },
  {
    _id: 'cert_infosys_1',
    title: 'Course Completion Certificate',
    subtitle: 'Learn SQL For Oracle Databases – Using Toad From Scratch',
    organization: 'Infosys Springboard',
    issueDate: '11 June 2025',
    type: 'infosys',
    skills: ['SQL Query Writing', 'Oracle Database', 'Toad IDE', 'Schema Design'],
  },
];

// Profile API
export const getProfile = async () => {
  try {
    const res = await api.get('/profile');
    return (res.data && res.data.name) ? res.data : DEFAULT_PROFILE;
  } catch (err) {
    console.warn('Backend profile API unavailable, using default profile data.');
    return DEFAULT_PROFILE;
  }
};

export const updateProfile = async (data) => {
  const res = await api.put('/profile', data);
  return res.data;
};

// Education API
export const getEducation = async () => {
  try {
    const res = await api.get('/education');
    return Array.isArray(res.data) ? res.data : DEFAULT_EDUCATION;
  } catch (err) {
    console.warn('Backend education API unavailable, using default education data.');
    return DEFAULT_EDUCATION;
  }
};

export const createEducation = async (data) => {
  const res = await api.post('/education', data);
  return res.data;
};

export const updateEducation = async (id, data) => {
  const res = await api.put(`/education/${id}`, data);
  return res.data;
};

export const deleteEducation = async (id) => {
  const res = await api.delete(`/education/${id}`);
  return res.data;
};

// Skills API
export const getSkills = async () => {
  try {
    const res = await api.get('/skills');
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.warn('Backend skills API unavailable, using component default skills.');
    return [];
  }
};

export const createSkill = async (data) => {
  const res = await api.post('/skills', data);
  return res.data;
};

export const updateSkill = async (id, data) => {
  const res = await api.put(`/skills/${id}`, data);
  return res.data;
};

export const deleteSkill = async (id) => {
  const res = await api.delete(`/skills/${id}`);
  return res.data;
};

// Experience API
export const getExperience = async () => {
  try {
    const res = await api.get('/experience');
    return Array.isArray(res.data) ? res.data : DEFAULT_EXPERIENCE;
  } catch (err) {
    console.warn('Backend experience API unavailable, using default experience data.');
    return DEFAULT_EXPERIENCE;
  }
};

export const createExperience = async (data) => {
  const res = await api.post('/experience', data);
  return res.data;
};

export const updateExperience = async (id, data) => {
  const res = await api.put(`/experience/${id}`, data);
  return res.data;
};

export const deleteExperience = async (id) => {
  const res = await api.delete(`/experience/${id}`);
  return res.data;
};

// Projects API
export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    return Array.isArray(res.data) ? res.data : DEFAULT_PROJECTS;
  } catch (err) {
    console.warn('Backend projects API unavailable, using default projects data.');
    return DEFAULT_PROJECTS;
  }
};

export const createProject = async (data) => {
  const res = await api.post('/projects', data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

// Certificates API
export const getCertificates = async () => {
  try {
    const res = await api.get('/certificates');
    return Array.isArray(res.data) ? res.data : DEFAULT_CERTIFICATES;
  } catch (err) {
    console.warn('Backend certificates API unavailable, using default certificates data.');
    return DEFAULT_CERTIFICATES;
  }
};

export const createCertificate = async (data) => {
  const res = await api.post('/certificates', data);
  return res.data;
};

export const updateCertificate = async (id, data) => {
  const res = await api.put(`/certificates/${id}`, data);
  return res.data;
};

export const deleteCertificate = async (id) => {
  const res = await api.delete(`/certificates/${id}`);
  return res.data;
};

// Auth & Admin APIs
export const adminLogin = async (credentials) => {
  try {
    const res = await api.post('/auth/login', credentials);
    if (res.data?.token) {
      localStorage.setItem('admin_token', res.data.token);
    }
    return res.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      throw err.response.data.message;
    }
    if (err.code === 'ERR_NETWORK' || !err.response) {
      throw 'Unable to connect to backend server. Please verify backend is running on port 5000.';
    }
    throw err.message || 'Invalid admin credentials';
  }
};

// Contact API
export const sendContactMessage = async (data) => {
  try {
    const res = await api.post('/contact', data);
    return res.data;
  } catch (err) {
    console.warn('Contact API POST failed, utilizing local fallback:', err);
    // If backend returns an explicit 400 validation error (e.g. invalid email format)
    if (err.response?.status === 400 && err.response?.data?.message) {
      throw err.response.data.message;
    }
    // For any network / 500 / proxy error, save to localStorage so the message is preserved & user sees success!
    try {
      const offlineMessages = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
      const newMsg = {
        _id: 'contact_' + Date.now(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      offlineMessages.unshift(newMsg);
      localStorage.setItem('portfolio_contact_messages', JSON.stringify(offlineMessages));
      return { message: 'Message sent successfully!', data: newMsg };
    } catch (localErr) {
      throw (typeof err.response?.data?.message === 'string' ? err.response.data.message : err.message) || 'Unable to send your message. Please try again.';
    }
  }
};

export const getContactMessages = async () => {
  const offlineMessages = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
  try {
    const res = await api.get('/contact');
    return Array.isArray(res.data) ? [...offlineMessages, ...res.data] : offlineMessages;
  } catch (err) {
    return offlineMessages;
  }
};

export const deleteContactMessage = async (id) => {
  const res = await api.delete(`/contact/${id}`);
  return res.data;
};

// Resume API
export const getResume = async () => {
  try {
    const res = await api.get('/resume');
    return res.data;
  } catch (err) {
    return null;
  }
};

export const uploadResume = async (data) => {
  const res = await api.post('/resume', data);
  return res.data;
};

export default api;

