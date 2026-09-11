import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Profile API
export const getProfile = async () => {
  try {
    const res = await api.get('/profile');
    return res.data;
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    return null;
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
    return res.data || [];
  } catch (err) {
    console.error('Error fetching education:', err.message);
    return [];
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
    return res.data || [];
  } catch (err) {
    console.error('Error fetching skills:', err.message);
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
    return res.data || [];
  } catch (err) {
    console.error('Error fetching experience:', err.message);
    return [];
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
    return res.data || [];
  } catch (err) {
    console.error('Error fetching projects from API:', err.message);
    return [];
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
    return res.data || [];
  } catch (err) {
    console.error('Error fetching certificates from API:', err.message);
    return [];
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
  const res = await api.post('/auth/login', credentials);
  if (res.data?.token) {
    localStorage.setItem('admin_token', res.data.token);
  }
  return res.data;
};

// Contact API
export const sendContactMessage = async (data) => {
  try {
    const res = await api.post('/contact', data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Unable to send your message. Please try again.';
  }
};

export const getContactMessages = async () => {
  const res = await api.get('/contact');
  return res.data;
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
