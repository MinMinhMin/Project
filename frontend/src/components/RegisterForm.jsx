import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/RegisterForm.module.css";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const response = await axios.post(`${backendUrl}/user/register`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      navigate("/login");
      console.log("Registered successfully:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Username already exists.");
      } else {
        setError("Registration failed. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Register</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
