import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../services/Register";

export function RegisterForm_Controller() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError(""); // Clear previous error

    await Register(username, password, navigate);
    setLoading(false);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    setLoading,
    handleSubmit,
  };
}
