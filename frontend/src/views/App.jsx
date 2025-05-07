import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import LogoutPage from "./LogoutPage";

import Layout from "../components/Layout";
import ProtectedRoute from "../routes/ProtectedRoute";

import { getUserName } from "../controllers/App_Controller";

import "../styles/App.css";

function App() {
  const { username, setUsername } = getUserName();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Layout username={username} setUsername={setUsername} />}
        >
          <Route path="*" element={<h1>Nothing to see LMAO</h1>} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<LoginPage setUsername={setUsername} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
