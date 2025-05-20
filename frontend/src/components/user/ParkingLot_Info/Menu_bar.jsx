import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/user/Menu_bar.module.css";

const Menu_bar = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here, e.g., clearing tokens, redirecting, etc.
  };

  return (
    <div className={styles.menuBar}>
      <div className={styles["menu-bar-right"]}>
        <NavLink
          to="/my-parking"
          className={({ isActive }) =>
            `${styles["nav-link"]} ${isActive ? styles.active : ""}`
          }
        >
          Bãi đỗ của tôi
        </NavLink>
        <NavLink
          to="/renue"
          className={({ isActive }) =>
            `${styles["nav-link"]} ${isActive ? styles.active : ""}`
          }
        >
          Xem doanh thu
        </NavLink>
        <NavLink
          to="/my-profile"
          className={({ isActive }) =>
            `${styles["nav-link"]} ${isActive ? styles.active : ""}`
          }
        >
          Thông tin cá nhân
        </NavLink>
      </div>
    </div>
  );
};

export default Menu_bar;