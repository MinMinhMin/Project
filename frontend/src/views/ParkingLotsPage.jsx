import React from "react";
import "../styles/ParkingLotsPage.css";

import ParkingLot_Info from "../components/user/ParkingLot_Info/ParkingLot_Info";
import Menu_bar from "../components/user/ParkingLot_Info/Menu_bar";
import ParkingRevenue from "../components/user/ParkingLot_Info/ParkingRevenue";
import UserInfo from "../components/user/ParkingLot_Info/user_Info";
import { Route, Routes } from "react-router-dom";
export default function ParkingLotsPage() {
  return (
    <>
      <Menu_bar />
      <Routes>
        <Route path="/" element={<ParkingLot_Info />} />
        <Route path="/renue" element={<ParkingRevenue />} />
        <Route path="/my-profile" element={<UserInfo />} />
      </Routes>
    </>
  );
}
