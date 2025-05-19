import React from "react";
import { Link } from "react-router-dom";
import TopBarLeft from "../components/topbarLeft";
import styles from "../styles/user/usertopbar.module.css";
import { useNavigate } from "react-router-dom";

const UserTopBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Xử lý đăng xuất, ví dụ: xóa token, chuyển hướng...
    localStorage.removeItem("token");
    console.log("Logging out...");
    navigate("/"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <div className={styles.topbar}>
      <div className={styles["topbar-left"]}>
        <TopBarLeft />
      </div>

      <div className={styles["topbar-right"]}>
        <Link to="/my-parking" className={styles["nav-link"]}>
          Bãi đỗ của tôi
        </Link>
        <Link
          to="/observe"
          className={`${styles["nav-link"]} ${styles["active"]}`}
        >
          Theo dõi ra vào
        </Link>
        <Link to="/history" className={styles["nav-link"]}>
          Tra cứu lịch sử
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

export default UserTopBar;
