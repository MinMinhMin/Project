import React, { use, useState, useEffect } from "react";
import styles from "../../../styles/user/currentParking.module.css"; // CSS Module
const backendUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
const token = localStorage.getItem("token");
const CurrentParking = ({ onChangeParkingLot }) => {
  const [currentParking, setCurrentParking] = useState("None");

  const [dropdown, setDropdown] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [parkings, setParkings] = useState([]);

  async function fetchParkinglot() {
    try {
      const res = await axios.get(`${backendUrl}/parking_lot/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", res.data);

      // Transform API data to match the frontend shape
      const transformedData = res.data.map((lot, index) => {
        return {
          id: lot.id,
          name: lot.name ?? "Chưa có tên",
        };
      });

      setParkings(transformedData);
      const id = Number(localStorage.getItem("ParkingLotId"));

      if (id) {
        const parking = transformedData.find((item) => item.id === id);
        console.log("Parking:", parking);
        if (parking) {
          setCurrentParking(parking.name);
        }
      } else {
        setCurrentParking(transformedData[0]?.name ?? "None");
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  useEffect(() => {
    if (!token) return;
    fetchParkinglot();
  }, [token]);

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
              onClick={() => {
                setCurrentParking(parking.name), onChangeParkingLot(parking.id);
              }}
            >
              Bãi đỗ: <strong>{parking.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentParking;
