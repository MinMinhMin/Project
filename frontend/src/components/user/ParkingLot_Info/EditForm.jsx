import React, { useState, useEffect } from "react";
import styles from "../../../styles/EditForm.module.css";

import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const EditForm = ({ lotId, parkingLots, onClose }) => {
  const lot = parkingLots.find((lot) => lot.id === lotId);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    remaining: "",
  });

  // Điền dữ liệu ban đầu
  useEffect(() => {
    if (lot) {
      setFormData({
        name: lot.name || "",
        location: lot.location || "",
        capacity: lot.capacity ? lot.capacity.toString() : "",
        remaining: lot.remaining ? lot.remaining.toString() : "",
      });
    }
  }, [lot]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function updateParkingLot(id, name, location, capacity, remaining) {
    const payload = {
      name: name,
      location: location,
      capacity: capacity,
      available_spots: remaining,
    };
    try {
      const res = await axios.put(
        `${backendUrl}/parking_lot/update/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update response:", res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateParkingLot(
      lotId,
      formData.name,
      formData.location,
      formData.capacity,
      formData.remaining
    );
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={styles["Edit-form-container"]}>
      <h2 className={styles["Edit-form-title"]}>Chỉnh sửa bãi đỗ</h2>
      <form className={styles["Edit-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Tên bãi đỗ</label>
          <input
            type="text"
            id="name"
            className={styles["form-control"]}
            placeholder="Vui lòng nhập"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="location">Địa chỉ bãi đỗ</label>
          <input
            type="text"
            id="location"
            className={styles["form-control"]}
            placeholder="Map"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="capacity">Sức chứa tối đa</label>
          <input
            type="number"
            id="capacity"
            className={styles["form-control"]}
            placeholder="Vui lòng nhập số"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="remaining">Số vị trí còn trống</label>
          <input
            type="number"
            id="remaining"
            className={styles["form-control"]}
            placeholder="Vui lòng nhập số"
            value={formData.remaining}
            onChange={handleChange}
          />
        </div>
        <div className={styles["buttons-container"]}>
          <button
            type="button"
            className={`${styles.btn} ${styles["btn-cancel"]}`}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${styles.btn} ${styles["btn-submit"]}`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
