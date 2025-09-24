// services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8081/api/auth";

export const signup = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};


export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    // If the backend returns { error: "..." }, treat it as failure
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data; // User object
  } catch (error) {
    // Show more useful error in frontend
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
