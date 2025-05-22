import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL;

export default async function Login({ data, navigate, setErrorMessage }) {
  try {
    const response = await axios.post(`${backendUrl}/user/login`, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const token = response.data.access_token;
    localStorage.setItem("token", token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload.role;

    if (role === "admin") {
      localStorage.setItem("role", role);
      navigate("/admin");
    }
    if (role === "user") {
      localStorage.setItem("role", role);
      navigate("/observe");
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        setErrorMessage("Incorrect username or password.");
      } else if (status === 422) {
        setErrorMessage("Please fill in both fields correctly.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } else {
      setErrorMessage("Cannot connect to server.");
    }
  }
}
