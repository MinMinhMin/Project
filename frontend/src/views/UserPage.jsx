import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserPage.css";
import UserTopBar from "../layout/usertopbar";
import MainScreen from "../components/user/observe/mainScreen";
import Notification from "../components/user/observe/notification";

const backendUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
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
    <div className="user-page">
      <div className="container">
        <div className="current-parking-container">
          <p>
            Bãi đỗ: <strong>{currentParking}</strong>
          </p>
          <img
            src="/assets/icon-change.svg"
            alt="icon-change"
            className="icon-change"
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
          <ul className="dropdown-menu">
            {parkings.map((parking, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => setCurrentParking(parking)}
              >
                Bãi đỗ: <strong>{parking}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Notification />
      <MainScreen />
    </div>
  );
}
