// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../services/authServices"; // ✅ make sure path is correct
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);

      if (user.error) {
        alert("Invalid email or password!");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user)); // ✅ store user info/token if returned
      alert("Login successful!");
     navigate("/tasklist");

    } catch (error) {
      alert("Login failed! Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
