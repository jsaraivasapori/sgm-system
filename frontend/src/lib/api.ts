import axios from "axios";

export const api = axios.create({
  // Ajuste a porta se seu NestJS não estiver na 3000
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1/",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("sgm.token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
