import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  // baseURL: "https://unified-muskrat-known.ngrok-free.app/viva-store",
  baseURL: "http://localhost:8300/viva-store",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
