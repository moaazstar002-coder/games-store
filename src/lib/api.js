import axios from "axios";
import { resolveApiBaseURL } from "./apiConfig";

const baseURL = resolveApiBaseURL(
  import.meta.env.VITE_API_BASE_URL,
  import.meta.env.DEV,
);

const api = axios.create({
  baseURL: baseURL ?? undefined,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (!baseURL) {
    return Promise.reject(
      new Error("VITE_API_BASE_URL must be set for production builds."),
    );
  }

  return config;
});

export default api;
