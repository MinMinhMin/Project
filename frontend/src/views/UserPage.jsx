import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/UserPage.css";
import MainScreen from "../components/user/observe/mainScreen";
import Notification from "../components/user/observe/notification";
import CurrentParking from "../components/user/observe/currentParking";
import History from "../components/user/querryHistory/History";
const backendUrl = import.meta.env.VITE_API_URL;
const role = localStorage.getItem("role");

export default function UserPage() {
  const location = useLocation();
  useEffect(() => {
    if (role !== "user") {
      window.location.reload();
    }

    console.log("Role:", role);
  }, [location.pathname, role]);

  const [ParkingLotId, setParkingLotId] = useState(
    localStorage.getItem("ParkingLotId") || ""
  );

  useEffect(() => {
    // Re-fetch or reset ParkingLotId whenever navigated to
    const storedId = localStorage.getItem("ParkingLotId") || "";
    setParkingLotId(storedId);
  }, [location.pathname]);

  const handleParkingLotChange = (newId) => {
    setParkingLotId(newId);
    localStorage.setItem("ParkingLotId", newId);
  };

  return (
    <div className="user-page">
      {/* <CurrentParking onChangeParkingLot={handleParkingLotChange} /> */}
      <Notification handleParkingLotChange={handleParkingLotChange}/>
      <MainScreen ParkingLotId={ParkingLotId} />
    </div>
  );
}
