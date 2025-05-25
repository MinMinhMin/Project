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
          end // Thêm end prop để chỉ active khi đúng path
          className={({ isActive }) => 
            `${styles["nav-link"]} ${isActive ? styles.active : ''}`
          }
        >
          Bãi đỗ của tôi
        </NavLink>
        <NavLink
          to="/my-parking/renue"
          className={({ isActive }) => 
            `${styles["nav-link"]} ${isActive ? styles.active : ''}`
          }
        >
          Thống kê
        </NavLink>
        <NavLink
          to="/my-parking/my-profile"
          className={({ isActive }) => 
            `${styles["nav-link"]} ${isActive ? styles.active : ''}`
          }
        >
          Thông tin cá nhân
        </NavLink>
      </div>
    </div>
  );
};

export default Menu_bar;