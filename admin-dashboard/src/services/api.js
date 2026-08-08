import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
});

// Interceptor to add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Session expired or unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Only redirect if not already on the login page to avoid loops
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login?session=expired";
        }
      }

      // Resource not found
      if (error.response.status === 404) {
        console.error("API Error: Resource not found");
      }

      // Server error
      if (error.response.status >= 500) {
        console.error("API Error: Server-side issue");
      }
    } else if (error.request) {
      // Network error
      console.error("API Error: No response from server. Check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
