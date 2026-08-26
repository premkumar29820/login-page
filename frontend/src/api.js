import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (email, password) => {
  return api.post("/login", {
    email,
    password,
  });
};

export default api;