import React, { use } from "react";
import styles from "../../../styles/user/notification.module.css"; // CSS Module

import CurrentParking from "./currentParking";

import { useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_API_URL; // Ensure this is set correctly in your environment
import axios from "axios";
const token = localStorage.getItem("token");

const Notification = ({ ParkingLotId, handleParkingLotChange }) => {
  const [moto_in, setMotoIn] = useState(0);
  const [car_in, setCarIn] = useState(0);
  const [moto_out, setMotoOut] = useState(0);
  const [car_out, setCarOut] = useState(0);
  const [moto_not_out, setMotoNotOut] = useState(0);
  const [car_not_out, setCarNotOut] = useState(0);
  const [revenue, setRevenue] = useState("500.000");

  function getCurrentDateInfo() {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    return date;
  }

  function getNextDateInfo() {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add 1 day
    const date = now.toISOString().split("T")[0];
    return date;
  }

  async function fetchHistory() {
    const params = {};
    if (ParkingLotId) {
      params.date_from = getCurrentDateInfo();
      params.date_to = getNextDateInfo();
      params.parking_lot_id = ParkingLotId;
    }

    const res = await axios.get(`${backendUrl}/history/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    const motor_out = res.data.filter(
      (vehicle) =>
        vehicle.date_in && vehicle.date_out && vehicle.vehicle_type === "Xe máy"
    );

    const motor_in = res.data.filter(
      (vehicle) => vehicle.date_in && vehicle.vehicle_type === "Xe máy"
    );

    const car_out = res.data.filter(
      (vehicle) =>
        vehicle.date_in && vehicle.date_out && vehicle.vehicle_type === "Ô tô"
    );

    const car_in = res.data.filter(
      (vehicle) => vehicle.date_in && vehicle.vehicle_type === "Ô tô"
    );

    const moto_not_out = res.data.filter(
      (vehicle) =>
        vehicle.date_in &&
        !vehicle.date_out &&
        vehicle.vehicle_type === "Xe máy"
    );
    const car_not_out = res.data.filter(
      (vehicle) =>
        vehicle.date_in && !vehicle.date_out && vehicle.vehicle_type === "Ô tô"
    );

    setCarNotOut(car_not_out.length);
    setMotoNotOut(moto_not_out.length);
    setCarIn(car_in.length);
    setCarOut(car_out.length);
    setMotoIn(motor_in.length);
    setMotoOut(motor_out.length);

    console.log("History data:", res.data);
  }

  useEffect(() => {
    if (!ParkingLotId || !token) {
      return;
    }
    fetchHistory();
  }, [ParkingLotId]);

  return (
    <div className={styles.notification}>
      <CurrentParking onChangeParkingLot={handleParkingLotChange} />

      <div className={`${styles.container} ${styles.in}`}>
        <div className={styles.title}>Xe vào</div>
        <div className={styles.content}>
          <div className={styles["content-left"]}>
            Xe máy
            <p className={styles["moto-in"]}>{moto_in || 0} xe</p>
          </div>

          <div className={styles["v-line"]}></div>

          <div className={styles["content-right"]}>
            Ô tô
            <p className={styles["car-in"]}>{car_in || 0} xe</p>
          </div>
        </div>
      </div>

      {/* <div className={styles["vertical-line"]}></div> */}

      <div className={`${styles.container} ${styles.out}`}>
        <div className={styles.title}>Xe ra</div>
        <div className={styles.content}>
          <div className={styles["content-left"]}>
            Xe máy
            <p className={styles["moto-out"]}>{moto_out || 0} xe</p>
          </div>

          <div className={styles["v-line"]}></div>

          <div className={styles["content-right"]}>
            Ô tô
            <p className={styles["car-out"]}>{car_out || 0} xe</p>
          </div>
        </div>
      </div>

      {/* <div className={styles["vertical-line"]}></div> */}

      <div className={`${styles.container} ${styles.not} ${styles.out}`}>
        <div className={styles.title}>Xe chưa ra</div>
        <div className={styles.content}>
          <div className={styles["content-left"]}>
            Xe máy
            <p className={styles["moto-not-out"]}>{moto_not_out || 0} xe</p>
          </div>

          <div className={styles["v-line"]}></div>

          <div className={styles["content-right"]}>
            Ô tô
            <p className={styles["car-not-out"]}>{car_not_out || 0} xe</p>
          </div>
        </div>
      </div>

      {/* <div className={styles["vertical-line"]}></div>

      <div className={`${styles.container} ${styles.revenue}`}>
        <div className={styles.title}>Tổng tiền</div>
        <div className={styles.content}>
          <p className={styles["revenue-num"]}>{revenue || "500.000"} đ</p>
        </div>
      </div> */}
    </div>
  );
};

export default Notification;
