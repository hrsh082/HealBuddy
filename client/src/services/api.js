import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

export const patientAPI = {
  getDashboard: (userId) => api.get(`/patients/dashboard/${userId}`),
  getProfile: (userId) => api.get(`/patients/${userId}`),
  updateProfile: (userId, data) => api.put(`/patients/${userId}`, data),
};

export const symptomAPI = {
  getSymptoms: (userId) => api.get(`/symptoms/${userId}`),
  createSymptom: (data) => api.post('/symptoms', data),
  getSymptomDetail: (userId, symptomId) => api.get(`/symptoms/${userId}/${symptomId}`),
  updateSymptom: (symptomId, data) => api.put(`/symptoms/${symptomId}`, data),
  getSolutions: (symptomId) => api.post(`/symptoms/${symptomId}/solutions`),
};

export const reportAPI = {
  getReports: (userId) => api.get(`/reports/${userId}`),
  uploadReport: (userId, formData) => api.post(`/reports/upload/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getReportDetail: (userId, reportId) => api.get(`/reports/${userId}/${reportId}`),
  scanReport: (reportId) => api.post(`/reports/${reportId}/scan`),
};

export const chatbotAPI = {
  startConversation: (userId) => api.post('/chatbot/conversation/start', { userId }),
  getMessages: (userId, conversationId) => api.get(`/chatbot/${userId}/${conversationId}`),
  sendMessage: (data) => api.post('/chatbot/message', data),
};

export const aiAPI = {
  analyzeReport: (reportId, data) => api.post(`/ai/analyze-report/${reportId}`, data),
  assessSymptoms: (data) => api.post('/ai/assess-symptoms', data),
};

export default api;
