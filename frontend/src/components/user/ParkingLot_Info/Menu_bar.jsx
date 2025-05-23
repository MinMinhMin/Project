import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/user/Menu_bar.module.css";
import { Route, Routes } from "react-router-dom";
import ParkingRevenue from "./ParkingRevenue";
import ParkingLot_Info from "./ParkingLot_Info";
import UserInfo from "./user_Info";
const Menu_bar = () => {
  return (
    <div className={styles.menuBar}>
      <div className={styles["menu-bar-right"]}>
        <NavLink
          to="/my-parking"
          className={({ isActive }) => `${styles["nav-link"]} `}
        >
          Bãi đỗ của tôi
        </NavLink>
        <NavLink
          to="/my-parking/renue"
          className={({ isActive }) => `${styles["nav-link"]} `}
        >
          Xem doanh thu
        </NavLink>
        <NavLink
          to="/my-parking/my-profile"
          className={({ isActive }) => `${styles["nav-link"]} `}
        >
          Thông tin cá nhân
        </NavLink>
      </div>
    </div>
  );
};

export default Menu_bar;
