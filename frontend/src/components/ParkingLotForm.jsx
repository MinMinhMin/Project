import React, { useState, useEffect } from "react";
import styles from "../styles/ParkingLotForm.module.css"; // Import styles as a module
import { ParkingLotForm_Controller } from "../controllers/ParkingLotForm_Controller";

const ParkingLotForm = ({ isOpen, closeModal, onSubmit, parkingLot }) => {
  const {
    name,
    setName,
    location,
    setLocation,
    capacity,
    setCapacity,
    availableSpots,
    setAvailableSpots,
    handleSubmit,
  } = ParkingLotForm_Controller({ closeModal, parkingLot, onSubmit });

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{parkingLot ? "Edit Parking Lot" : "Add Parking Lot"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Available Spots</label>
            <input
              type="number"
              value={availableSpots}
              onChange={(e) => setAvailableSpots(e.target.value)}
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit">
              {parkingLot ? "Save Changes" : "Add Parking Lot"}
            </button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParkingLotForm;
