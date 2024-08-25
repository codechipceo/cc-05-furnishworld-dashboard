import axios from "axios";
import { backendUrl } from "./config.js";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: backendUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent, like adding an authorization header
    const token = localStorage.getItem("token"); // Assuming you store your token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Do something with the response error
    if (error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
