// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import ProfileBox from "../layout/ProfileBox"; // Adjust path as needed
import styles from "../styles/Layout.module.css"; // Adjust path as needed

const Layout = ({ username, setUsername }) => {
  return (
    <div className={styles.layoutWrapper}>
      <ProfileBox username={username} setUsername={setUsername} />
      <Outlet />
    </div>
  );
};

export default Layout;
