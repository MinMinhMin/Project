import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/user/Menu_bar.module.css";

const Menu_bar = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className={styles.menuBar}>
      <div className={styles["menu-bar-right"]}>
        <Link to="/my-parking" className={`${styles["nav-link"]} ${styles["active"]}`}>Bãi đỗ của tôi</Link>
        <Link to="/renue" className={styles["nav-link"]}>Xem doanh thu</Link>
        <Link to="/my-profile" className={styles["nav-link"]}>Thông tin cá nhân</Link>
        
          
        </div>
      </div>
    
  );
};

export default Menu_bar;
