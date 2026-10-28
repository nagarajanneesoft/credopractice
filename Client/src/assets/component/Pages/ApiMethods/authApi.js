import axios from "axios";

// Live la Vercel env VITE_API_URL (Render URL + /api); local la localhost
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Login pannina apram ellaa API call kum idhaiye use pannunga
export const authApi = axios.create({
  baseURL: API_URL,
  timeout: 60000, // Render free server thoongi irundha ezhundhirikka 1 min aagum
});

// Request pogum munnaadi: token irundha header la add pannum
// (Login.jsx la save panna same key: "accessToken")
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Server 401 sonna (token expire / thappu): clear panni login page ku anuppum
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
