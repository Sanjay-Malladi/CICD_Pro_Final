import axios from "axios";

const API_URL = "http://localhost:8081/api/tasks";

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new task
export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Toggle task completion (mark as done/undone)
export const toggleTaskCompletion = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/toggle`);
  return response.data;
};

// ✅ Delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
