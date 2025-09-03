import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: "https://deciding-chamois-luckily.ngrok-free.app/viva-store",
  // baseURL: "http://localhost:8300/viva-store",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

export default api;
