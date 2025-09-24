// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN", // cookie set by server
  xsrfHeaderName: "X-CSRF-Token", // header Axios will send
});
