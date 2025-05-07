import React, { useState } from "react";
import styles from "../styles/LoginForm.module.css";
import LoginForm_Controller from "../controllers/LoginForm_Controller";

const LoginForm = ({ setUsername }) => {
  const {
    formUsername,
    setFormUsername,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    handleSubmit,
  } = LoginForm_Controller({ setUsername });

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
