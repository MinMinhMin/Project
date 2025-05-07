import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../services/Register";

export function RegisterForm_Controller() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    Register(username, password, navigate);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
