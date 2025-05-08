import { useState, useEffect } from "react";
export function getUserName() {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.sub);
        setRole(payload.role);
      } catch {
        console.error("Invalid token");
      }
    }
  }, []);

  return { username, setUsername, role };
}
