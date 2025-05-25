import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopBarLeft from "../components/topbarLeft";
import styles from "../styles/user/usertopbar.module.css";

const UserTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    console.log("Logging out...");
    navigate("/"); // redirect to login
  };

  const handleNavigateToHistory = () => {
    if (location.pathname !== "/history") {
      navigate("/history");
      window.location.reload(); // Force reload after navigating
    }
  };

  return (
    <div className={styles.topbar}>
      <div className={styles["topbar-left"]}>
        <TopBarLeft />
      </div>

      <div className={styles["topbar-right"]}>
        <Link
          to="/my-parking"
          className={`${styles["nav-link"]} ${
            location.pathname.startsWith("/my-parking") ? styles["active"] : ""
          }`}
        >
          Bãi đỗ của tôi
        </Link>

        <Link
          to="/observe"
          className={`${styles["nav-link"]} ${
            location.pathname === "/observe" ? styles["active"] : ""
          }`}
        >
          Theo dõi ra vào
        </Link>

        <div
          onClick={handleNavigateToHistory}
          className={`${styles["nav-link"]} ${
            location.pathname === "/history" ? styles["active"] : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          Tra cứu lịch sử
        </div>

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

export default UserTopBar;
