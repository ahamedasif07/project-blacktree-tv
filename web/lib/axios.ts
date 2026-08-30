import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? window.location.origin + "/api/v1" : (process.env.BACKEND_URL ? process.env.BACKEND_URL + "/api/v1" : "http://localhost:5000/api/v1")),
  withCredentials: true, // Crucial for Better Auth cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., clear store, redirect to login)
    }
    return Promise.reject(error);
  }
);

export default api;
