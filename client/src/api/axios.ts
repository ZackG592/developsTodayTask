import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL ?? "http://localhost:4000",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default api;
