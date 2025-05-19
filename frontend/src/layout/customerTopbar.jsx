import React from "react";
import { Link } from "react-router-dom";
import TopBarLeft from "../components/topbarLeft";
import styles from "../styles/CustomerTopBar.module.css";

const CustomerTopBar = () => {
  return (
    <div className={styles["topbar"]}>
      <TopBarLeft />
    </div>
  );
};

export default CustomerTopBar;
