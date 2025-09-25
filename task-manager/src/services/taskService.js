const API_URL = "http://localhost:9092/api/tasks";

export const getTasks = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await res.json();
};

export const toggleTaskCompletion = async (id) => {
  const res = await fetch(`${API_URL}/${id}/toggle`, { method: "PUT" });
  if (!res.ok) throw new Error("Toggle failed");
  return await res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return true;
};
