// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../styles/Layout.module.css"; // Adjust path as needed

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      {children}
      <Outlet />
    </div>
  );
};

export default Layout;
