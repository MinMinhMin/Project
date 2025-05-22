import React, { useState } from "react";
import styles from "../styles/LoginForm.module.css";
import LoginForm_Controller from "../controllers/LoginForm_Controller";

import LoadingIndicator from "./LoadingIndicator";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    formUsername,
    setFormUsername,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
    handleSubmit,
  } = LoginForm_Controller();

  return (
    <div className={styles.loginContainer}>
      <div className={styles["container-login-title"]}>
        <img src="/assets/user-icon.svg" alt="" />
        <div className={styles.loginTitle}>
          <p>Đăng nhập</p>
        </div>
      </div>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles["input-container"]}>
          <p>Tên đăng nhập</p>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Tên đăng nhập"
            value={formUsername}
            onChange={(e) => setFormUsername(e.target.value)}
          />
        </div>

        <div className={styles["password-container"]}>
          <p>Mật khẩu</p>
          <div className={styles.passwordInputWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.inputField}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? "/assets/eye-off.svg" : "/assets/eye.svg"}
              alt="Toggle visibility"
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </div>
      </form>

      {loading && <LoadingIndicator />}
      <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>
        Đăng nhập
      </button>
    </div>
  );
};

export default LoginForm;
