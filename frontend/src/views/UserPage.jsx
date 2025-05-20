import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserPage.css";
import UserTopBar from "../layout/usertopbar";
import MainScreen from "../components/user/observe/mainScreen";
import Notification from "../components/user/observe/notification";

const backendUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
  return (
    <div className="user-page">
      <Notification />
      <MainScreen />
    </div>
  );
}
