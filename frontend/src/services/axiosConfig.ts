// src/services/axiosConfig.ts
import axios from 'axios';

// ตั้งค่า base URL
axios.defaults.baseURL = 'http://localhost:3000/api';

// Interceptor สำหรับส่ง Token
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor สำหรับจัดการ Error
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Logout หากหมดเวลา Token
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;