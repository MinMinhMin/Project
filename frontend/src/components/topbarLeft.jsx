import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/TopBarLeft.module.css";

const TopBarLeft = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className={styles.topbar}>
      <div className={styles["topbar-left"]}>
        <div className={styles["logo-circle"]}>
          <img
            className={styles["logo-inside"]}
            src="/assets/logo.svg"
            alt="Logo"
          />
        </div>

        <div className={styles["logo-text"]}>
          <div className={styles.title}>Parking</div>
          <div className={styles.subtitle}>Hệ thống đỗ xe thông minh</div>
        </div>
      </div>
    </div>
  );
};

export default TopBarLeft;