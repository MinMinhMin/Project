import React from "react";
import styles from "../styles/RegisterForm.module.css";
import { RegisterForm_Controller } from "../controllers/RegisterForm_Controller";

const RegisterForm = () => {
  const { username, setUsername, password, setPassword, error, handleSubmit } =
    RegisterForm_Controller();
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
