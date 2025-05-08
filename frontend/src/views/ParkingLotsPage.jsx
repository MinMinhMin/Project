import React from "react";
import "../styles/ParkingLotsPage.css";
import ParkingLotForm from "../components/ParkingLotForm";

import { ParkingLotsPage_Controller } from "../controllers/ParkingLotsPage_Controller";

export default function ParkingLotsPage() {
  const {
    parkingLots,
    isModalOpen,
    setIsModalOpen,
    editingLot,
    handleAddParkingLot,
    handleEditParkingLot,
    handleSubmitParkingLot,
    handleDeleteParkingLot,
  } = ParkingLotsPage_Controller();

  return (
    <div className="parking-lots-page">
      <h1>Parking Lots</h1>
      <div className="actions">
        <button onClick={handleAddParkingLot}>Add Parking Lot</button>
      </div>
      <table className="parking-lot-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Available Spots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parkingLots.map((lot) => (
            <tr key={lot.id}>
              <td>{lot.id}</td>
              <td>{lot.name}</td>
              <td>{lot.location}</td>
              <td>{lot.capacity}</td>
              <td>{lot.available_spots}</td>
              <td>
                <button onClick={() => handleEditParkingLot(lot)}>Edit</button>
                <button onClick={() => handleDeleteParkingLot(lot.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing parking lots */}
      <ParkingLotForm
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSubmit={handleSubmitParkingLot}
        parkingLot={editingLot}
      />
    </div>
  );
}
