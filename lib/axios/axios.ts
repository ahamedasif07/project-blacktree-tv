import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? window.location.origin + "/api" : (process.env.BACKEND_URL ? process.env.BACKEND_URL + "/api" : "http://localhost:5000/api")),

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});