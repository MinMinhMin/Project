import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopBarLeft from "../components/topbarLeft";
import styles from "../styles/admin/admintopbar.module.css";
import { useNavigate } from "react-router-dom";
const AdminTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Logging out...");
    navigate("/"); // redirect to login
  };

  return (
    <div className={styles.topbar}>
      <div className={styles["topbar-left"]}>
        <TopBarLeft />
      </div>

      <div className={styles["topbar-right"]}>
        <div className={styles["role"]}>Admin</div>
        <Link
          to="/users"
          className={`${styles["nav-link"]} ${
            location.pathname.startsWith("/users") ||
            location.pathname.startsWith("/admin")
              ? styles["active"]
              : ""
          }`}
        >
          Danh sách người dùng
        </Link>

        <Link
          to="/parking-lots"
          className={`${styles["nav-link"]} ${
            location.pathname.startsWith("/parking-lots")
              ? styles["active"]
              : ""
          }`}
        >
          Danh sách bãi đỗ
        </Link>

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
