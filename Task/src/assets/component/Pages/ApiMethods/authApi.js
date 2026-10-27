import axios from "axios";

// Login pannina apram ellaa API call kum idhaiye use pannunga
export const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

// Request pogum munnaadi: token irundha header la add pannum
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
