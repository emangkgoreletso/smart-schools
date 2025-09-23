import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5025", // or http://localhost:5025 if not using https
});

export default api;
