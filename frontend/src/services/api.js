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

export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    return res.data || [];
  } catch (err) {
    console.error('Error fetching projects from API:', err.message);
    return [];
  }
};

export const getCertificates = async () => {
  try {
    const res = await api.get('/certificates');
    return res.data || [];
  } catch (err) {
    console.error('Error fetching certificates from API:', err.message);
    return [];
  }
};

export const sendContactMessage = async (data) => {
  try {
    const res = await api.post('/contact', data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Unable to send your message. Please try again.';
  }
};

export const adminLogin = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  if (res.data?.token) {
    localStorage.setItem('admin_token', res.data.token);
  }
  return res.data;
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

export const getContactMessages = async () => {
  const res = await api.get('/contact');
  return res.data;
};

export const deleteContactMessage = async (id) => {
  const res = await api.delete(`/contact/${id}`);
  return res.data;
};

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
