import axios from "axios";

const api = axios.create({
  baseURL:"https://login-page-obqq.onrender.com",
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
