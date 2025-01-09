import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Use the base URL from the environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for requests and responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config (e.g., add auth token) before request is sent
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors globally
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
