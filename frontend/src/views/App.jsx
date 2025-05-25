import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import UserTopBar from "../layout/usertopbar";
import AdminTopBar from "../layout/adminTopBar";
import Layout from "../components/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";
import ParkingLotsPage from "./ParkingLotsPage";
import UserList from "../components/Admin/UserList";
import ParkingList from "../components/Admin/ParkingList";
import History from "../components/user/querryHistory/History";
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
            <Route
              path="/history/"
              element={
                <ProtectedRoute role="user">
                  <History />
                </ProtectedRoute>
              }
            />
          </Route>
          <>111s</>
          <Route
            element={
              <Layout>
                <AdminTopBar />
              </Layout>
            }
          >
            {" "}
            <Route
              path="/users"
              element={
                <ProtectedRoute role="admin">
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parking-lots"
              element={
                <ProtectedRoute role="admin">
                  <ParkingList />
                </ProtectedRoute>
              }
            />
          </Route>
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
