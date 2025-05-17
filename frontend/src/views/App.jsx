import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import ParkingLotsPage from "./ParkingLotsPage";
import AdminPage from "./AdminPage";
import UserTopBar from "../layout/usertopbar";
import Notification from "../components/user/observe/notification";
import MainScreen from "../components/user/observe/mainScreen";
import Layout from "../components/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";

import { getUserName } from "../controllers/App_Controller";

import "../index.css";

function App() {
  const { username, setUsername } = getUserName();

  return (
    <BrowserRouter>
      <div>
        <UserTopBar />
        <Notification />
        <MainScreen />
        {/* <Routes>
          <Route
            element={<Layout username={username} setUsername={setUsername} />}
          >
            <Route path="*" element={<h1>Nothing to see LMAO</h1>} />
            <Route
              path="/user"
              element={
                <ProtectedRoute role="user">
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parking-lots"
              element={
                <ProtectedRoute role="user">
                  <ParkingLotsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<LoginPage setUsername={setUsername} />}
            />
            <Route path="/logout" element={<LogoutPage />} />
          </Route>
        </Routes> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
