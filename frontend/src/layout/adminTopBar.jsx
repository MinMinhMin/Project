import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/admin/admintopbar.module.css";

const AdminTopBar = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className={styles.topbar}>
      <div className={styles["role"]}>Admin</div>

      <div className={styles["topbar-right"]}>
        <div className={`${styles["nav-link"]} ${styles["logout-btn"]}`} onClick={handleLogout}>
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;