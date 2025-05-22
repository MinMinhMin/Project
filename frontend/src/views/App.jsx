import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import AdminPage from "./AdminPage";
import UserTopBar from "../layout/usertopbar";
import Notification from "../components/user/observe/notification";
import MainScreen from "../components/user/observe/mainScreen";
import Layout from "../components/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";
import ParkingLotsPage from "./ParkingLotsPage";
import UserInfo from "../components/user/ParkingLot_Info/user_Info";
import MenuBar from "../components/user/ParkingLot_Info/Menu_bar";

import { getUserName } from "../controllers/App_Controller";

import "../styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            element={
              <Layout>
                <UserTopBar />
              </Layout>
            }
          >
            <Route
              path="/observe"
              element={
                <ProtectedRoute role="user">
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-parking/*"
              element={
                <ProtectedRoute role="user">
                  <ParkingLotsPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
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
