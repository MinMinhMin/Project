import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/LoginForm.module.css";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_API_URL;

const LoginForm = ({ setUsername }) => {
  const [formUsername, setFormUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.append("username", formUsername);
    data.append("password", password);

    try {
      const response = await axios.post(`${backendUrl}/user/login`, data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.sub);

      navigate("/user");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setErrorMessage("Incorrect username or password.");
        } else if (status === 422) {
          setErrorMessage("Please fill in both fields correctly.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } else {
        setErrorMessage("Cannot connect to server.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Username"
          value={formUsername}
          onChange={(e) => setFormUsername(e.target.value)}
        />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
