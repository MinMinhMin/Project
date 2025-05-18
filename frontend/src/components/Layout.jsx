// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import UserTopBar from "../layout/usertopbar";
import styles from "../styles/Layout.module.css"; // Adjust path as needed

const Layout = () => {
  return (
    <div className={styles.layoutWrapper}>
      <UserTopBar />
      <Outlet />
    </div>
  );
};

export default Layout;
