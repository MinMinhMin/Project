import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function LogoutPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return <Navigate to="/" />;
}

export default LogoutPage;
