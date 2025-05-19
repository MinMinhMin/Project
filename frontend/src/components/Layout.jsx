// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../styles/Layout.module.css"; // Adjust path as needed

const Layout = () => {
  return (
    <div className={styles.layoutWrapper}>
      <Outlet />
    </div>
  );
};

export default Layout;
