import React, { useState, useEffect } from "react";
import styles from "../styles/CameraController.module.css";

const CameraController = ({ onStop, onSnap, onChangeDevice }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) =>
        setDevices(devices.filter((d) => d.kind === "videoinput"))
      )
      .catch((err) => console.error("Device error:", err));
  }, []);

  return (
    <div className={styles.controller}>
      <button onClick={onSnap}>📸 Snap</button>
      <button onClick={onStop}>🛑 Stop</button>
      <select onChange={(e) => onChangeDevice(e.target.value)}>
        {devices.map((device, idx) => (
          <option key={idx} value={device.deviceId}>
            {device.label || `Camera ${idx + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CameraController;
