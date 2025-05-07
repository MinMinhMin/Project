import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL;

export default async function Register(username, password, navigate) {
  try {
    const response = await axios.post(`${backendUrl}/user/register`, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    navigate("/login");
    console.log("Registered successfully:", response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      setError("Username already exists.");
    } else {
      setError("Registration failed. Please try again.");
    }
    console.error("Registration error:", error);
  }
}
