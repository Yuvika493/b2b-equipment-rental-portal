import axios from "axios";

// All requests go through this one instance so the backend URL lives in
// exactly one place (VITE_API_URL). Nothing else in the app should
// reference the URL directly.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
