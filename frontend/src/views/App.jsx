import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import AdminPage from "./AdminPage";
import UserTopBar from "../layout/usertopbar";
import AdminTopBar from "../layout/adminTopBar";
import Layout from "../components/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";
import ParkingLotsPage from "./ParkingLotsPage";
import UserInfo from "../components/user/ParkingLot_Info/user_Info";
import MenuBar from "../components/user/ParkingLot_Info/Menu_bar";
import UserList from "../components/Admin/UserList";
import ParkingList from "../components/Admin/ParkingList";
import { getUserName } from "../controllers/App_Controller";
import History from "../components/user/querryHistory/History";
import UserList from "../components/Admin/UserList";
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
          <Route
            element={

            

              <Layout>
                <AdminTopBar />
              </Layout>
            }
          >
            {" "}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <UserList />
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
