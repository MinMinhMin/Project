import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProfileBox_Controller({ username, setUsername }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    setOpen(false);
    navigate("/login");
  };

  return { open, setOpen, handleLogout, navigate };
}
