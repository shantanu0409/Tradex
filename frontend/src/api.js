import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://localhost:3002",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  // Don't send token for public routes
  const publicRoutes = ["/login", "/signup"];

  if (!publicRoutes.includes(config.url)) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }
  }

  return config;
});

export default API;