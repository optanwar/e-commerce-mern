
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your base URL
});

// Add interceptors for error handling globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error?.response?.data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;