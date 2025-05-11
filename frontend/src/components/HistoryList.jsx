import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/HistoryList.module.css";

const backendUrl = import.meta.env.VITE_API_URL;

function HistoryList({ parkingLotId }) {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (!parkingLotId) return;

    const token = localStorage.getItem("token");
    axios
      .get(`${backendUrl}/history/list`, {
        params: { parking_lot_id: parkingLotId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHistoryData(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, [parkingLotId]);

  if (!historyData.length) return <p>No history records available.</p>;

  return (
    <div className={styles.historyList}>
      <h2 className={styles.title}>Histories Log</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Face Image</th>
            <th>License Plate Image</th>
            <th>License Plate</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img
                  src={item.face_image_path}
                  alt="face"
                  className={styles.image}
                />
              </td>
              <td>
                <img
                  src={item.license_plate_image_path}
                  alt="plate"
                  className={styles.image}
                />
              </td>
              <td>{item.license_plate}</td>
              <td>{item.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryList;
