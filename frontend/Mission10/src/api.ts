// src/api.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "";

const api = axios.create({
  baseURL: BASE,
  timeout: 8000,
});

export async function fetchBowlers() {
  const res = await api.get("/api/bowlers");
  return res.data;
}

export default api;