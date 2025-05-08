import React, { useState, useEffect } from "react";

export function ParkingLotForm_Controller({
  closeModal,
  parkingLot,
  onSubmit,
}) {
  const [name, setName] = useState(parkingLot?.name || "");
  const [location, setLocation] = useState(parkingLot?.location || "");
  const [capacity, setCapacity] = useState(parkingLot?.capacity || "");
  const [availableSpots, setAvailableSpots] = useState(
    parkingLot?.available_spots || ""
  );

  useEffect(() => {
    if (parkingLot) {
      setName(parkingLot.name);
      setLocation(parkingLot.location);
      setCapacity(parkingLot.capacity);
      setAvailableSpots(parkingLot.available_spots);
    }
  }, [parkingLot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || isNaN(capacity) || isNaN(availableSpots)) {
      alert("All fields are required and must be valid.");
      return;
    }

    onSubmit({
      name,
      location,
      capacity: parseInt(capacity, 10),
      available_spots: parseInt(availableSpots, 10),
    });
    closeModal();
  };

  return {
    name,
    setName,
    location,
    setLocation,
    capacity,
    setCapacity,
    availableSpots,
    setAvailableSpots,
    handleSubmit,
  };
}
