import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileBox_Controller } from "../controllers/ProfileBox_Controller";
import styles from "../styles/ProfileBox.module.css";

const ProfileBox = ({ username, setUsername, role }) => {
  const { open, setOpen, handleLogout, navigate } = ProfileBox_Controller({
    username,
    setUsername,
  });

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileButton} onClick={() => setOpen(!open)}>
        {username ? `👤 ${username}` : "Profile"}
      </div>

      {open && (
        <div className={styles.dropdownMenu}>
          {!username ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className={styles.menuItem}
              >
                Login
              </Link>
              <div onClick={handleLogout} className={styles.menuItem}>
                Logout
              </div>
            </>
          ) : role === "admin" ? (
            <>
              <div onClick={handleLogout} className={styles.menuItem}>
                Logout
              </div>
            </>
          ) : (
            <>
              <div
                className={styles.menuItem}
                onClick={() => {
                  navigate("/user");
                  setOpen(false);
                }}
                style={{ cursor: "pointer" }}
              >
                Work
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  navigate("/parking-lots");
                  setOpen(false);
                }}
                style={{ cursor: "pointer" }}
              >
                ParkingLots
              </div>
              <div onClick={handleLogout} className={styles.menuItem}>
                Logout
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
