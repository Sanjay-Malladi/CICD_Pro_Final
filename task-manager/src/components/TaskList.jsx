import React, { useState, useEffect } from "react";
import { getTasks, addTask, toggleTaskCompletion, deleteTask } from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("low");
  const [category, setCategory] = useState("Work");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const addedTask = await addTask({
        description: newTask,
        priority,
        category,
        completed: false,
      });
      setTasks((prev) => [...prev, addedTask]);
      setNewTask("");
    } catch (err) {
      console.error("Add task failed:", err);
      alert("Failed to add task");
    }
  };

  const handleToggle = async (id) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      await toggleTaskCompletion(id);
    } catch (err) {
      console.error("Toggle failed:", err);
      alert("Failed to toggle task");
      fetchTasks(); // fallback
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>
              {task.description} ({task.priority}) [{task.category}]
            </span>
            <button onClick={() => handleToggle(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            {task.completed && (
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
