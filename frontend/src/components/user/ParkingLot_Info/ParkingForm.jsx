import React, { useState } from "react";
import styles from "../../../styles/ParkingForm.module.css";

import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const ParkingForm = ({ onClose, id }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function createParkingLot(name, location, capacity, available_spots) {
    const payload = {
      name: name,
      location: location,
      capacity: capacity,
      available_spots: available_spots,
    };
    try {
      const res = await axios.post(
        `${backendUrl}/parking_lot/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Change URL if needed
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  async function createTicket(x, y, parking_lot_id) {
    const params = {
      x: x,
      y: y,
      parking_lot_id: parking_lot_id,
    };

    try {
      const res = await axios.post(
        `${backendUrl}/ticket/reset_and_create`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params, // this goes in the third argument
        }
      );
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }

  const handleSubmit = async (e) => {
    if (role == "admin") {
      alert("Bạn không có quyền tạo bãi đỗ");
      return;
    }
    e.preventDefault();

    await createParkingLot(
      formData.name,
      formData.location,
      Number(formData.capacity),
      Number(formData.capacity)
    );
    await createTicket(1, Number(formData.capacity), id);
    console.log("Form submitted:", formData);
    onClose(); // Close form after successful creation
  };
  const handleCancel = () => {
    setFormData({
      name: "",
      location: "",
      capacity: "",
    });
    onClose(); // Đóng form khi nhấn Cancel
  };

  return (
    <div className={styles["parking-form-container"]}>
      <h2 className={styles["parking-form-title"]}>Tạo bãi đỗ mới</h2>
      <form className={styles["parking-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Tên bãi đỗ</label>
          <input
            type="text"
            id="name"
            className={styles["form-control"]}
            placeholder="Vui lòng nhập"
            value={formData.name}
            onChange={handleChange}
            required
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
            required
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
            required
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

export default ParkingForm;
