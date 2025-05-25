import React from "react";
import { Link } from "react-router-dom";
import TopBarLeft from "../components/topbarLeft";
import styles from "../styles/admin/admintopbar.module.css";
import { useNavigate } from "react-router-dom";
const AdminTopBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/");
    console.log("Logging out...");
  };

  return (
    <div className={styles.topbar}>
      <div className={styles["topbar-left"]}>
        <TopBarLeft />
      </div>

      <div className={styles["topbar-right"]}>
        <div className={styles["role"]}>Admin</div>

        <div
          className={`${styles["nav-link"]} ${styles["logout-btn"]}`}
          onClick={handleLogout}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
