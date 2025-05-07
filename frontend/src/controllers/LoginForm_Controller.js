import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "../services/Login";

export default function LoginForm_Controller({ setUsername }) {
  const [formUsername, setFormUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.append("username", formUsername);
    data.append("password", password);

    Login({ data, setUsername, navigate });
  };
  return {
    formUsername,
    setFormUsername,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    handleSubmit,
  };
}
