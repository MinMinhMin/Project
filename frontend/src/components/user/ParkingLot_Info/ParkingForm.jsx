import React, { useState } from 'react';
import styles from '../../../styles/ParkingForm.module.css';

const ParkingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose(); // Đóng form sau khi submit
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      location: '',
      capacity: ''
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