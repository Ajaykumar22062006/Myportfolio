import axios from 'axios';

let rawApiUrl = import.meta.env.VITE_API_URL || 'https://ajayportfolio-backend.vercel.app';

// Sanitize & guard against invalid dashboard URLs, old Render URLs, or placeholder strings
if (
  !rawApiUrl ||
  rawApiUrl.includes('your-backend-api') ||
  rawApiUrl.includes('your-flask-backend') ||
  rawApiUrl.includes('example.com') ||
  rawApiUrl.includes('ACTUAL-RENDER-BACKEND') ||
  rawApiUrl.includes('vercel.com/ajay-227d') ||
  rawApiUrl.includes('onrender.com')
) {
  rawApiUrl = 'https://ajayportfolio-backend.vercel.app';
}

if (!rawApiUrl.endsWith('/api') && !rawApiUrl.endsWith('/api/')) {
  rawApiUrl = `${rawApiUrl.replace(/\/$/, '')}/api`;
}

const API_BASE_URL = rawApiUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Default Fallback Data (Synced directly with Database state)
export const DEFAULT_PROFILE = {
  "_id": "6aa3a3bf887fff65844d2954",
  "name": "Ajay Kumar D",
  "title": "Aspiring Full-Stack Developer",
  "subtitle": "Available for Full-Stack Opportunities",
  "bio": "I build responsive web applications and practical software solutions using modern frontend, backend, database, and networking technologies.",
  "narrative": "I am an aspiring Full-Stack Developer with a practical mindset centered on software engineering fundamentals, database architecture, and network communications.",
  "email": "ajay872072@gmail.com",
  "githubUrl": "https://github.com/Ajaykumar22062006",
  "linkedinUrl": "https://www.linkedin.com/in/ajay-kumar-d-18377a292?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  "statusText": "Available for Full-Stack Opportunities",
  "createdAt": "2026-09-11T06:46:23.801Z",
  "updatedAt": "2026-09-11T06:46:23.801Z",
  "__v": 0
};

export const DEFAULT_EDUCATION = [
  {
    "_id": "6aa3aa99887fff65844d2a23",
    "degree": "B.Tech",
    "department": "Artificial Intelligence and Data Science ",
    "college": "Jeppiaar Institute of Technology",
    "university": "",
    "duration": "2023-2027",
    "graduationYear": "",
    "status": "In Progress",
    "highlights": [],
    "createdAt": "2026-09-11T07:15:37.801Z",
    "updatedAt": "2026-09-11T07:38:51.967Z",
    "__v": 0,
    "cgpa": "7.53",
    "percentage": "",
    "result": ""
  },
  {
    "_id": "6aa3a92f887fff65844d29fb",
    "degree": "Higher Secondary Certificate (HSC / 12th Grade)",
    "department": "Computer Science",
    "college": "Anderson Higher Secondary School",
    "university": "",
    "duration": "2022-2023",
    "graduationYear": "",
    "status": "Completed",
    "highlights": [],
    "createdAt": "2026-09-11T07:09:35.931Z",
    "updatedAt": "2026-09-11T07:39:07.319Z",
    "__v": 0,
    "cgpa": "",
    "percentage": "72",
    "result": ""
  },
  {
    "_id": "6aa3a888887fff65844d29d3",
    "degree": "Secondary School Leaving Certificate(SSLC/10th Grade)",
    "department": "",
    "college": "Anderson Higher Secondary School",
    "university": "",
    "duration": "2020-2021",
    "graduationYear": "",
    "status": "Completed",
    "highlights": [],
    "createdAt": "2026-09-11T07:06:48.762Z",
    "updatedAt": "2026-09-11T07:39:17.333Z",
    "__v": 0,
    "cgpa": "",
    "percentage": "",
    "result": "All pass"
  }
];

export const DEFAULT_SKILLS = [
  {
    "_id": "6aa41e42671f76eb3fe3cead",
    "name": "MySQL",
    "category": "Database",
    "iconName": "Database",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceb5",
    "name": "VS Code & Vite",
    "category": "Tools",
    "iconName": "Wrench",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceb4",
    "name": "Postman",
    "category": "Tools",
    "iconName": "Wrench",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceb3",
    "name": "Git & GitHub",
    "category": "Tools",
    "iconName": "Wrench",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceb2",
    "name": "DHCP & ARP Analysis",
    "category": "Networking",
    "iconName": "Network",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceb1",
    "name": "IPv4 & Subnetting",
    "category": "Networking",
    "iconName": "Network",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceb0",
    "name": "VLANs & 802.1Q Trunking",
    "category": "Networking",
    "iconName": "Network",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceaf",
    "name": "Cisco Packet Tracer",
    "category": "Networking",
    "iconName": "Network",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceae",
    "name": "SQLite",
    "category": "Database",
    "iconName": "Database",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceac",
    "name": "MongoDB & Mongoose",
    "category": "Database",
    "iconName": "Database",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceab",
    "name": "JWT & Authentication",
    "category": "Backend",
    "iconName": "Server",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3ceaa",
    "name": "REST API Architecture",
    "category": "Backend",
    "iconName": "Server",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3cea9",
    "name": "Python (Flask)",
    "category": "Backend",
    "iconName": "Server",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3cea8",
    "name": "Node.js Express",
    "category": "Backend",
    "iconName": "Server",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3cea7",
    "name": "Redux Toolkit",
    "category": "Frontend",
    "iconName": "Code",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.401Z",
    "updatedAt": "2026-09-11T15:29:06.401Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3cea6",
    "name": "HTML5 & CSS3",
    "category": "Frontend",
    "iconName": "Code",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.400Z",
    "updatedAt": "2026-09-11T15:29:06.400Z"
  },
  {
    "_id": "6aa41e42671f76eb3fe3cea5",
    "name": "JavaScript (ES6+)",
    "category": "Frontend",
    "iconName": "Code",
    "level": "Core",
    "__v": 0,
    "createdAt": "2026-09-11T15:29:06.398Z",
    "updatedAt": "2026-09-11T15:29:06.398Z"
  }
];

export const DEFAULT_EXPERIENCE = [
  {
    "_id": "exp_tcs_1",
    "role": "Full-Stack Developer Intern",
    "company": "TCS iON Applied Industry Projects (AIP)",
    "location": "",
    "period": "Feb 2026 – May 2026",
    "type": "Industry Internship",
    "description": "Developed and implemented the University Hostel Management System digitizing student allocation, room records, fee payment tracking, and admin dashboards.",
    "highlights": [
      "Engineered RESTful endpoints using Node.js, Express, and MongoDB Mongoose schemas.",
      "Built responsive React frontend dashboards with glassmorphism UI components and Redux Toolkit state."
    ],
    "skills": ["React.js", "Node.js", "Express", "MongoDB"],
    "createdAt": "2026-09-11T00:00:00.000Z",
    "updatedAt": "2026-09-11T00:00:00.000Z"
  }
];

export const DEFAULT_PROJECTS = [
  {
    "_id": "6aa43100671f76eb3fe3d002",
    "title": "FoodRescue - Surplus Food Rescue Platform",
    "type": "Software Project",
    "organization": "",
    "duration": "",
    "period": "Sep 2026",
    "description": "FoodRescue is a full-stack web platform that connects food providers with NGOs to reduce surplus food wastage. Providers can list surplus food with quantity, expiry, and pickup details, while NGOs can search, claim, and manage food pickups. The system includes role-based authentication, claim management, quantity and shortage tracking, additional food updates, and an admin dashboard for monitoring users, listings, and claims.",
    "category": "Full Stack",
    "technologies": [
      "React.js",
      "Node.js Express",
      "MongoDB / SQLite",
      "REST APIs",
      "Role-Based Authentication",
      "Claim Management",
      "Git & GitHub"
    ],
    "features": [],
    "packetTracerFeatures": [],
    "githubUrl": "https://github.com/Ajaykumar22062006/FoodRescue",
    "liveUrl": "https://foodrescue-web.vercel.app",
    "certificateTitle": "",
    "certificateType": "",
    "createdAt": "2026-09-28T10:14:00.000Z",
    "updatedAt": "2026-09-28T10:14:00.000Z",
    "__v": 0
  },
  {
    "_id": "6aa43000671f76eb3fe3d001",
    "title": "Personal Full-Stack Developer Portfolio",
    "type": "Software Project",
    "organization": "",
    "duration": "",
    "period": "Sep 2026",
    "description": "Personal Full-Stack Developer Portfolio is a responsive web application designed to showcase my technical skills, academic background, projects, certifications, resume, and achievements. The portfolio provides an interactive and user-friendly interface with project showcases, certificate viewing, responsive design, dark/light mode, and a contact section. It demonstrates my practical knowledge of frontend and backend development, database management, REST APIs, and modern web technologies.",
    "category": "Full Stack",
    "technologies": [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5 & CSS3",
      "Node.js Express",
      "Python (Flask)",
      "MongoDB / SQLite",
      "REST APIs",
      "Git & GitHub"
    ],
    "features": [],
    "packetTracerFeatures": [],
    "githubUrl": "https://github.com/Ajaykumar22062006/Myportfolio",
    "liveUrl": "https://myportfolio-ajaykumar.vercel.app",
    "certificateTitle": "",
    "certificateType": "",
    "createdAt": "2026-09-28T10:11:00.000Z",
    "updatedAt": "2026-09-28T10:11:00.000Z",
    "__v": 0
  },
  {
    "_id": "6aa42068671f76eb3fe3cf67",
    "title": "University Hostel Management System",
    "type": "Software Project",
    "organization": "",
    "duration": "",
    "period": "",
    "description": "Developed a web-based University Hostel Management System to automate hostel administration activities,\nincluding student record management, room allocation, complaint tracking, and fee payment monitoring. The\nsystem provides real-time information through an interactive dashboard and centralized database, improving data\naccuracy, reducing manual workload, and enhancing overall hostel management efficiency.",
    "category": "Full Stack",
    "technologies": [
      "MySQL Workbench",
      "Postman",
      "Git",
      "GitHub"
    ],
    "features": [],
    "packetTracerFeatures": [],
    "githubUrl": "https://github.com/Ajaykumar22062006/hostel_management",
    "liveUrl": "https://hostel-management-tcs.vercel.app",
    "certificateTitle": "",
    "certificateType": "",
    "createdAt": "2026-09-11T15:38:16.663Z",
    "updatedAt": "2026-09-11T15:38:16.663Z",
    "__v": 0
  },
  {
    "_id": "6aa38041510c1a7f35ee600b",
    "title": "Network Monitoring and Analysis System with Cisco Network Simulation",
    "type": "Software Project",
    "organization": "Cisco",
    "duration": "",
    "period": "",
    "description": "Developed a network management system using Python, Flask, and SQLite with Cisco Packet Tracer for prac\ntical network simulation. Implemented device inventory, IP connectivity testing, subnet calculation, ARP/MAC\naddress analysis, and system logging. Simulated IP addressing, VLANs, 802.1Q trunking, inter-VLAN routing,\nDHCP, ARP, and MAC address learning for network monitoring and troubleshooting.",
    "category": "Networking",
    "technologies": [
      "IPv4 & Subnetting",
      "ARP & MAC Addressing",
      "VLANs",
      "802.1Q  Trunking",
      "Inter-VLAN Routing",
      "DHCP",
      "ICMP/Ping"
    ],
    "features": [],
    "packetTracerFeatures": [],
    "githubUrl": "https://github.com/Ajaykumar22062006/Network-monitoring-analysis-system",
    "liveUrl": "https://network-monitoring-cisco.vercel.app",
    "certificateTitle": "",
    "certificateType": "",
    "createdAt": "2026-09-11T04:14:57.792Z",
    "updatedAt": "2026-09-11T14:19:46.606Z",
    "__v": 0
  }
];

export const DEFAULT_CERTIFICATES = [
  {
    "_id": "cert_tcs_ion_1",
    "title": "Certificate of Industry Project",
    "subtitle": "University Hostel Management System",
    "organization": "TCS iON Applied Industry Projects (AIP)",
    "issueDate": "08 May 2026",
    "type": "tcs_ion",
    "skills": [
      "Java", "Spring", "MySQL", "HTML/CSS", "Hostel Operations", "Database Management"
    ],
    "certificateImage": "/certificates/tcs_cert.png",
    "createdAt": "2026-05-08T10:00:00.000Z",
    "updatedAt": "2026-05-08T10:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "cert_cisco_1",
    "title": "Certificate of Course Completion",
    "subtitle": "Networking Basics",
    "organization": "Cisco Networking Academy",
    "issueDate": "13 August 2026",
    "type": "cisco",
    "skills": [
      "Network communication", "Ethernet", "IPv4", "IPv6", "Routing", "Network troubleshooting"
    ],
    "certificateImage": "/certificates/cisco_cert.png",
    "createdAt": "2026-08-13T10:00:00.000Z",
    "updatedAt": "2026-08-13T10:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "cert_infosys_1",
    "title": "Course Completion Certificate",
    "subtitle": "Learn SQL For Oracle Databases – Using Toad From Scratch",
    "organization": "Infosys Springboard",
    "issueDate": "11 June 2025",
    "type": "infosys",
    "skills": [
      "SQL Query Writing", "Oracle Database", "Toad IDE", "Schema Design"
    ],
    "certificateImage": "/certificates/infosys_cert.png",
    "createdAt": "2025-06-11T10:00:00.000Z",
    "updatedAt": "2025-06-11T10:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "cert_softrate_1",
    "title": "Certificate Of Internship Completion",
    "subtitle": "Full Stack Web Development",
    "organization": "Softrate Technologies (P) LTD",
    "issueDate": "26 September 2026",
    "type": "softrate",
    "skills": [
      "React.js", "Node.js", "Express", "MongoDB", "Full Stack Web Development"
    ],
    "certificateImage": "/certificates/softrate_cert.png",
    "createdAt": "2026-09-26T10:00:00.000Z",
    "updatedAt": "2026-09-26T10:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "cert_tata_elxsi_1",
    "title": "Certificate of Participation",
    "subtitle": "Teliport Season 3 (Team Innovators)",
    "organization": "Tata Elxsi",
    "issueDate": "15 June 2026",
    "type": "tata_elxsi",
    "skills": [
      "System Design", "Problem Solving", "Product Innovation"
    ],
    "certificateImage": "/certificates/tata_elxsi_cert.png",
    "createdAt": "2026-06-15T10:00:00.000Z",
    "updatedAt": "2026-06-15T10:00:00.000Z",
    "__v": 0
  }
];

export const DEFAULT_RESUME = {
  filename: 'ajay-resume.pdf',
  fileType: 'application/pdf',
  url: '/ajay-resume.pdf',
  // NOTE: base64Content is intentionally empty in DEFAULT_RESUME.
  // The public portfolio MUST always load from MongoDB via GET /resume.
  // Only the static /ajay-resume.pdf URL above is used as a last-resort fallback.
  base64Content: '',
};

const getLocalStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (item !== null && item !== undefined) {
      return JSON.parse(item);
    }
    return fallback;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to localStorage:`, err);
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get('/profile');
    if (res.data && res.data.name) {
      setLocalStorage('portfolio_admin_profile', res.data);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend profile API unavailable, using local storage / defaults.');
  }
  return getLocalStorage('portfolio_admin_profile', DEFAULT_PROFILE);
};

export const updateProfile = async (data) => {
  setLocalStorage('portfolio_admin_profile', data);
  try {
    const res = await api.put('/profile', data);
    return res.data;
  } catch (err) {
    return data;
  }
};

// Education API
export const getEducation = async () => {
  try {
    const res = await api.get('/education');
    if (Array.isArray(res.data)) {
      setLocalStorage('portfolio_admin_education', res.data);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend education API unavailable, using local storage / defaults.');
  }
  return getLocalStorage('portfolio_admin_education', DEFAULT_EDUCATION);
};

export const createEducation = async (data) => {
  const cached = getLocalStorage('portfolio_admin_education', null);
  const current = Array.isArray(cached) ? cached : (await getEducation());
  const newItem = { _id: 'edu_' + Date.now(), ...data };
  const updated = [newItem, ...current.filter((item) => (item._id || item.id) !== newItem._id)];
  setLocalStorage('portfolio_admin_education', updated);
  try {
    const res = await api.post('/education', data);
    if (res.data && (res.data._id || res.data.id)) {
      const serverUpdated = [res.data, ...current.filter((item) => (item._id || item.id) !== (res.data._id || res.data.id))];
      setLocalStorage('portfolio_admin_education', serverUpdated);
      return res.data;
    }
    return newItem;
  } catch (err) {
    return newItem;
  }
};

export const updateEducation = async (id, data) => {
  const cached = getLocalStorage('portfolio_admin_education', null);
  const current = Array.isArray(cached) ? cached : (await getEducation());
  const updated = current.map((item) => ((item._id || item.id) === id ? { ...item, ...data } : item));
  setLocalStorage('portfolio_admin_education', updated);
  try {
    const res = await api.put(`/education/${id}`, data);
    return res.data;
  } catch (err) {
    return { ...data, _id: id };
  }
};

export const deleteEducation = async (id) => {
  const cached = getLocalStorage('portfolio_admin_education', []);
  const updated = cached.filter((item) => (item._id || item.id) !== id && String(item._id) !== String(id) && String(item.id) !== String(id));
  setLocalStorage('portfolio_admin_education', updated);

  try {
    const res = await api.delete(`/education/${id}`);
    return res.data;
  } catch (err) {
    return { message: 'Deleted successfully' };
  }
};

// Skills API
export const getSkills = async () => {
  try {
    const res = await api.get('/skills');
    if (Array.isArray(res.data)) {
      setLocalStorage('portfolio_admin_skills', res.data);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend skills API unavailable, using local storage / defaults.');
  }
  return getLocalStorage('portfolio_admin_skills', DEFAULT_SKILLS);
};

export const createSkill = async (data) => {
  const cached = getLocalStorage('portfolio_admin_skills', null);
  const current = Array.isArray(cached) ? cached : (await getSkills());
  const newItem = { _id: 'skill_' + Date.now(), ...data };
  const updated = [newItem, ...current.filter((item) => (item._id || item.id) !== newItem._id)];
  setLocalStorage('portfolio_admin_skills', updated);
  try {
    const res = await api.post('/skills', data);
    if (res.data && (res.data._id || res.data.id)) {
      const serverUpdated = [res.data, ...current.filter((item) => (item._id || item.id) !== (res.data._id || res.data.id))];
      setLocalStorage('portfolio_admin_skills', serverUpdated);
      return res.data;
    }
    return newItem;
  } catch (err) {
    return newItem;
  }
};

export const updateSkill = async (id, data) => {
  const cached = getLocalStorage('portfolio_admin_skills', null);
  const current = Array.isArray(cached) ? cached : (await getSkills());
  const updated = current.map((item) => ((item._id || item.id) === id ? { ...item, ...data } : item));
  setLocalStorage('portfolio_admin_skills', updated);
  try {
    const res = await api.put(`/skills/${id}`, data);
    return res.data;
  } catch (err) {
    return { ...data, _id: id };
  }
};

export const deleteSkill = async (id) => {
  const cached = getLocalStorage('portfolio_admin_skills', []);
  const updated = cached.filter((item) => (item._id || item.id) !== id && String(item._id) !== String(id) && String(item.id) !== String(id));
  setLocalStorage('portfolio_admin_skills', updated);

  try {
    const res = await api.delete(`/skills/${id}`);
    return res.data;
  } catch (err) {
    return { message: 'Deleted successfully' };
  }
};

// Experience API
const sanitizeExperienceList = (list) => {
  if (!Array.isArray(list)) return [];
  return list.map((item) => {
    if (item && item.location && item.location.trim().toLowerCase() === 'remote') {
      return { ...item, location: '' };
    }
    return item;
  });
};

export const getExperience = async () => {
  try {
    const res = await api.get('/experience');
    if (Array.isArray(res.data)) {
      const sanitized = sanitizeExperienceList(res.data);
      setLocalStorage('portfolio_admin_experience', sanitized);
      return sanitized;
    }
  } catch (err) {
    console.warn('Backend experience API unavailable, using local storage / defaults.');
  }
  const cached = getLocalStorage('portfolio_admin_experience', DEFAULT_EXPERIENCE);
  const sanitized = sanitizeExperienceList(cached);
  setLocalStorage('portfolio_admin_experience', sanitized);
  return sanitized;
};

export const createExperience = async (data) => {
  const cached = getLocalStorage('portfolio_admin_experience', null);
  const current = Array.isArray(cached) ? cached : (await getExperience());
  const newItem = { _id: 'exp_' + Date.now(), ...data };
  const updated = [newItem, ...current.filter((item) => (item._id || item.id) !== newItem._id)];
  setLocalStorage('portfolio_admin_experience', updated);
  try {
    const res = await api.post('/experience', data);
    if (res.data && (res.data._id || res.data.id)) {
      const serverUpdated = [res.data, ...current.filter((item) => (item._id || item.id) !== (res.data._id || res.data.id))];
      setLocalStorage('portfolio_admin_experience', serverUpdated);
      return res.data;
    }
    return newItem;
  } catch (err) {
    return newItem;
  }
};

export const updateExperience = async (id, data) => {
  const cached = getLocalStorage('portfolio_admin_experience', null);
  const current = Array.isArray(cached) ? cached : (await getExperience());
  const updated = current.map((item) => ((item._id || item.id) === id ? { ...item, ...data } : item));
  setLocalStorage('portfolio_admin_experience', updated);
  try {
    const res = await api.put(`/experience/${id}`, data);
    return res.data;
  } catch (err) {
    return { ...data, _id: id };
  }
};

export const deleteExperience = async (id) => {
  const cached = getLocalStorage('portfolio_admin_experience', []);
  const updated = cached.filter((item) => (item._id || item.id) !== id && String(item._id) !== String(id) && String(item.id) !== String(id));
  setLocalStorage('portfolio_admin_experience', updated);

  try {
    const res = await api.delete(`/experience/${id}`);
    return res.data;
  } catch (err) {
    return { message: 'Deleted successfully' };
  }
};

// Projects API
export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    if (Array.isArray(res.data)) {
      setLocalStorage('portfolio_admin_projects', res.data);
      return res.data;
    }
  } catch (err) {
    console.warn('Backend projects API unavailable, using local storage / defaults.');
  }
  return getLocalStorage('portfolio_admin_projects', DEFAULT_PROJECTS);
};

export const createProject = async (data) => {
  const cached = getLocalStorage('portfolio_admin_projects', null);
  const current = Array.isArray(cached) ? cached : (await getProjects());
  const newItem = { _id: 'proj_' + Date.now(), ...data };
  const updated = [newItem, ...current.filter((item) => (item._id || item.id) !== newItem._id)];
  setLocalStorage('portfolio_admin_projects', updated);
  try {
    const res = await api.post('/projects', data);
    if (res.data && (res.data._id || res.data.id)) {
      const serverUpdated = [res.data, ...current.filter((item) => (item._id || item.id) !== (res.data._id || res.data.id))];
      setLocalStorage('portfolio_admin_projects', serverUpdated);
      return res.data;
    }
    return newItem;
  } catch (err) {
    return newItem;
  }
};

export const updateProject = async (id, data) => {
  const cached = getLocalStorage('portfolio_admin_projects', null);
  const current = Array.isArray(cached) ? cached : (await getProjects());
  const updated = current.map((item) => ((item._id || item.id) === id ? { ...item, ...data } : item));
  setLocalStorage('portfolio_admin_projects', updated);
  try {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  } catch (err) {
    return { ...data, _id: id };
  }
};

export const deleteProject = async (id) => {
  const cached = getLocalStorage('portfolio_admin_projects', []);
  const updated = cached.filter((item) => (item._id || item.id) !== id && String(item._id) !== String(id) && String(item.id) !== String(id));
  setLocalStorage('portfolio_admin_projects', updated);

  try {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  } catch (err) {
    return { message: 'Deleted successfully' };
  }
};

// Certificates API
const formatCertSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills.flatMap((s) => (typeof s === 'string' ? s.split(',').map((part) => part.trim()).filter(Boolean) : s));
  }
  if (typeof skills === 'string') {
    return skills.split(',').map((part) => part.trim()).filter(Boolean);
  }
  return [];
};

export const getCertificates = async () => {
  const CACHE_VERSION_KEY = 'portfolio_certs_cache_v4';
  if (typeof window !== 'undefined' && !localStorage.getItem(CACHE_VERSION_KEY)) {
    localStorage.removeItem('portfolio_admin_certificates');
    localStorage.setItem(CACHE_VERSION_KEY, 'true');
  }

  const cached = getLocalStorage('portfolio_admin_certificates', null);
  try {
    const res = await api.get('/certificates');
    if (Array.isArray(res.data) && res.data.length > 0) {
      const merged = res.data.map((item) => {
        let certImg = item.certificateImage;
        if (!certImg) {
          const matchingDef = DEFAULT_CERTIFICATES.find(
            (c) =>
              (c._id || c.id) === (item._id || item.id) ||
              (c.title && item.title && c.title.toLowerCase() === item.title.toLowerCase())
          );
          if (matchingDef && matchingDef.certificateImage) {
            certImg = matchingDef.certificateImage;
          }
        }
        return {
          ...item,
          skills: formatCertSkills(item.skills),
          certificateImage: certImg || '',
        };
      });

      // Also ensure all default original certificates are present
      DEFAULT_CERTIFICATES.forEach((defCert) => {
        const isPresent = merged.some(
          (m) =>
            (m._id || m.id) === defCert._id ||
            (m.title && m.title.toLowerCase() === defCert.title.toLowerCase())
        );
        if (!isPresent) {
          merged.push(defCert);
        }
      });

      setLocalStorage('portfolio_admin_certificates', merged);
      return merged;
    }
  } catch (err) {
    console.warn('Backend certificates API unavailable, using local storage / defaults.');
  }
  const localCerts = getLocalStorage('portfolio_admin_certificates', DEFAULT_CERTIFICATES);
  const certsArr = Array.isArray(localCerts) && localCerts.length > 0 ? localCerts : DEFAULT_CERTIFICATES;
  return certsArr.map((item) => ({
    ...item,
    skills: formatCertSkills(item.skills),
  }));
};

export const createCertificate = async (data) => {
  const cached = getLocalStorage('portfolio_admin_certificates', null);
  const fetched = await getCertificates();
  const current = Array.isArray(cached) ? cached : (Array.isArray(fetched) ? fetched : []);
  const formattedData = {
    ...data,
    skills: formatCertSkills(data.skills),
  };
  const newItem = { _id: 'cert_' + Date.now(), ...formattedData };
  const updated = [newItem, ...current.filter((item) => (item._id || item.id) !== newItem._id)];
  setLocalStorage('portfolio_admin_certificates', updated);
  try {
    const res = await api.post('/certificates', formattedData);
    if (res.data && (res.data._id || res.data.id)) {
      const resItem = { ...res.data, skills: formatCertSkills(res.data.skills) };
      const serverUpdated = [resItem, ...current.filter((item) => (item._id || item.id) !== (resItem._id || resItem.id))];
      setLocalStorage('portfolio_admin_certificates', serverUpdated);
      return resItem;
    }
    return newItem;
  } catch (err) {
    return newItem;
  }
};

export const updateCertificate = async (id, data) => {
  const cached = getLocalStorage('portfolio_admin_certificates', null);
  const fetched = await getCertificates();
  const current = Array.isArray(cached) ? cached : (Array.isArray(fetched) ? fetched : []);
  const formattedData = {
    ...data,
    skills: formatCertSkills(data.skills),
  };
  const updated = current.map((item) => ((item._id || item.id) === id ? { ...item, ...formattedData } : item));
  setLocalStorage('portfolio_admin_certificates', updated);
  try {
    const res = await api.put(`/certificates/${id}`, formattedData);
    if (res.data) {
      return { ...res.data, skills: formatCertSkills(res.data.skills) };
    }
    return { ...formattedData, _id: id };
  } catch (err) {
    return { ...formattedData, _id: id };
  }
};

export const deleteCertificate = async (id) => {
  const cached = getLocalStorage('portfolio_admin_certificates', []);
  const current = Array.isArray(cached) ? cached : [];
  const updated = current.filter((item) => (item._id || item.id) !== id && String(item._id) !== String(id) && String(item.id) !== String(id));
  setLocalStorage('portfolio_admin_certificates', updated);

  try {
    const res = await api.delete(`/certificates/${id}`);
    return res.data;
  } catch (err) {
    return { message: 'Deleted successfully' };
  }
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
      // Local fallback token for admin when backend offline
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const fallbackToken = 'offline_admin_token_' + Date.now();
        localStorage.setItem('admin_token', fallbackToken);
        return { token: fallbackToken, message: 'Admin login successful (offline mode)' };
      }
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
    if (err.response?.status === 400 && err.response?.data?.message) {
      throw err.response.data.message;
    }
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
  try {
    const offlineMessages = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
    const filtered = offlineMessages.filter((m) => (m._id || m.id) !== id);
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(filtered));
  } catch (e) { }

  try {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  } catch (err) {
    return { message: 'Message deleted' };
  }
};

// Helper to robustly convert Base64 data URI or raw string to a Blob URL
export const getBlobUrlFromBase64 = (content, defaultMime = 'application/pdf') => {
  if (!content || typeof content !== 'string') return null;
  try {
    let mime = defaultMime;
    let base64Data = content.trim();

    if (base64Data.startsWith('data:')) {
      const commaIndex = base64Data.indexOf(',');
      if (commaIndex !== -1) {
        const header = base64Data.substring(0, commaIndex);
        const mimeMatch = header.match(/:(.*?);/);
        if (mimeMatch && mimeMatch[1]) {
          mime = mimeMatch[1];
        }
        base64Data = base64Data.substring(commaIndex + 1);
      }
    }

    // Clean whitespace and linebreaks
    base64Data = base64Data.replace(/[\s\r\n]/g, '');

    // Add padding if missing
    while (base64Data.length % 4 !== 0) {
      base64Data += '=';
    }

    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: mime });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('getBlobUrlFromBase64 error:', err);
    return null;
  }
};

import { saveResumeToDb, getResumeFromDb } from './resumeDb';

// Resume API
export const getResume = async () => {
  // Check persistent IndexedDB first for instant access
  let idbResume = null;
  try {
    idbResume = await getResumeFromDb();
  } catch (e) {
    // IndexedDB access fallback
  }

  // Try fetching latest active resume from backend
  try {
    const res = await api.get('/resume', { timeout: 5000 });
    const resumeObj = res.data?.data || res.data;
    if (resumeObj && (resumeObj.base64Content || resumeObj.filename || resumeObj.url || resumeObj.blobUrl)) {
      await saveResumeToDb(resumeObj);
      setLocalStorage('portfolio_admin_resume', resumeObj);
      return resumeObj;
    }
  } catch (err) {
    console.warn('Backend GET /resume failed or offline, using persistent local store...');
  }

  // If backend didn't return a valid resume, return from IndexedDB
  if (idbResume && (idbResume.base64Content || idbResume.url || idbResume.blobUrl)) {
    return idbResume;
  }

  // Fallback to localStorage
  const cached = getLocalStorage('portfolio_admin_resume');
  if (cached && (cached.base64Content || (cached.filename && cached.filename !== 'ajay-resume.pdf') || cached.url)) {
    return cached;
  }

  return {
    _id: 'resume_active',
    filename: 'ajay-resume.pdf',
    fileType: 'application/pdf',
    url: '/ajay-resume.pdf',
  };
};

export const uploadResume = async (data) => {
  const resumePayload = {
    filename: data.filename || 'ajay-resume.pdf',
    fileType: data.fileType || 'application/pdf',
    base64Content: data.base64Content || '',
    url: data.url || '',
    blobUrl: data.blobUrl || '',
    updatedAt: new Date().toISOString(),
  };

  // 1. Immediately persist full resume document into IndexedDB (no 5MB storage limit)
  try {
    await saveResumeToDb(resumePayload);
  } catch (idbErr) {
    console.warn('Could not save to IndexedDB:', idbErr);
  }

  // 2. Safely store in localStorage (try full, if quota exceeded store metadata)
  try {
    setLocalStorage('portfolio_admin_resume', resumePayload);
  } catch (lsErr) {
    setLocalStorage('portfolio_admin_resume', {
      filename: resumePayload.filename,
      fileType: resumePayload.fileType,
      updatedAt: resumePayload.updatedAt,
    });
  }

  // 3. Notify all listeners/components across tabs that resume has updated
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('portfolio_resume_updated', { detail: resumePayload }));
    } catch (e) {}
  }

  // 4. Synchronize with Backend API
  let savedServerObj = null;
  try {
    let payload = data;
    let headers = {};

    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    const res = await api.post('/resume', payload, {
      headers,
      timeout: 30000,
    });

    savedServerObj = res.data?.data || res.data;
    if (savedServerObj && typeof savedServerObj === 'object') {
      const merged = { ...resumePayload, ...savedServerObj };
      await saveResumeToDb(merged);
      setLocalStorage('portfolio_admin_resume', merged);
      return merged;
    }
  } catch (err) {
    console.warn('Backend resume sync skipped or failed (local persistent copy saved):', err?.message);
  }

  return savedServerObj || resumePayload;
};

export default api;
