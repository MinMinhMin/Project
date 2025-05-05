import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SavedImagesWindow from "../components/SavedImagesWindow";

import styles from "../styles/ProfileBox.module.css";

const ProfileBox = ({ username, setUsername }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    setOpen(false);
    navigate("/login");
  };

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
                to="/register"
                onClick={() => setOpen(false)}
                className={styles.menuItem}
              >
                Register
              </Link>
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
              <SavedImagesWindow />
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
