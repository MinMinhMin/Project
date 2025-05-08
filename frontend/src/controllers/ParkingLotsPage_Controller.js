import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  GetParkingLots,
  CreateParkingLot,
  UpdateParkingLot,
  DeleteParkingLot,
} from "../services/ParkingLots";

const backendUrl = import.meta.env.VITE_API_URL;

export function ParkingLotsPage_Controller() {
  const [parkingLots, setParkingLots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLot, setEditingLot] = useState(null);

  const handleAddParkingLot = () => {
    setEditingLot(null);
    setIsModalOpen(true);
  };

  const handleEditParkingLot = (lot) => {
    setEditingLot(lot);
    setIsModalOpen(true);
  };

  const handleSubmitParkingLot = async (data) => {
    try {
      if (editingLot) {
        // Update existing parking lot
        UpdateParkingLot({
          id: editingLot.id,
          data,
          setParkingLots,
        });
      } else {
        CreateParkingLot({ data, setParkingLots });
      }
    } catch (error) {
      console.error("Error submitting parking lot:", error);
      alert("Failed to submit parking lot.");
    }
  };

  const handleDeleteParkingLot = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parking lot?"))
      return;

    DeleteParkingLot({ id, setParkingLots });
  };

  GetParkingLots({ setParkingLots });
  return {
    parkingLots,
    isModalOpen,
    setIsModalOpen,
    editingLot,
    handleAddParkingLot,
    handleEditParkingLot,
    handleSubmitParkingLot,
    handleDeleteParkingLot,
  };
}
