import React, { useState } from "react";
import styles from "../../../styles/user/currentParking.module.css"; // CSS Module

const CurrentParking = () => {
  const [currentParking, setCurrentParking] = useState("UET-G2");

  const [dropdown, setDropdown] = useState(false);
  const [rotate, setRotate] = useState(0);

  const parkings = [
    "UET-G2",
    "UET-GD2",
    "UET-G2",
    "UET-GD2",
    "UET-G2",
    "UET-GD2",
  ];
  return (
    <div className={styles.container}>
      <div className={styles["current-parking-container"]}>
        <p>
          Bãi đỗ: <strong>{currentParking}</strong>
        </p>
        <img
          src="/assets/icon-change.svg"
          alt="icon-change"
          className={styles["icon-change"]}
          onClick={() => {
            setDropdown(!dropdown);
            setRotate(dropdown ? 0 : 30);
          }}
          style={{
            transform: `rotate(${rotate}deg)`,
            transition: "transform 0.3s ease",
          }}
        />
      </div>
      {dropdown && (
        <ul className={styles["dropdown-menu"]}>
          {parkings.map((parking, index) => (
            <li
              key={index}
              className={styles["dropdown-item"]}
              onClick={() => setCurrentParking(parking)}
            >
              Bãi đỗ: <strong>{parking}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentParking;
