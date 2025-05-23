import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserPage.css";
import MainScreen from "../components/user/observe/mainScreen";
import Notification from "../components/user/observe/notification";
import CurrentParking from "../components/user/observe/currentParking";

const backendUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
  const [ParkingLotId, setParkingLotId] = useState(
    localStorage.getItem("ParkingLotId") || ""
  );
  const handleParkingLotChange = (newId) => {
    setParkingLotId(newId);
    localStorage.setItem("ParkingLotId", newId);
  };

  return (
    <div className="user-page">
      <CurrentParking onChangeParkingLot={handleParkingLotChange} />
      <Notification />
      <MainScreen ParkingLotId={ParkingLotId} />
    </div>
  );
}
