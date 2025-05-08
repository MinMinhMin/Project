import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css";

const backendUrl = import.meta.env.VITE_API_URL;

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({ username: "", password: "" });
  const [localPasswords, setLocalPasswords] = useState({});
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/user/create`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocalPasswords((prev) => ({
        ...prev,
        [newUser.username]: newUser.password,
      }));
      setNewUser({ username: "", password: "" });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create user");
    }
  };

  const togglePassword = (username) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/user/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete user");
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    const user = users[index];
    setEditUser({
      username: user.username,
      password: localPasswords[user.username] || "",
    });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditUser({ username: "", password: "" });
  };

  const saveEdit = async (userId) => {
    try {
      await axios.put(`${backendUrl}/user/update/${userId}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocalPasswords((prev) => ({
        ...prev,
        [editUser.username]: editUser.password,
      }));
      fetchUsers();
      cancelEdit();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update user");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin User Management</h2>

      {error && <p className="error-text">{error}</p>}

      <form className="create-form" onSubmit={handleCreateUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create User</button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editUser.username}
                    onChange={(e) =>
                      setEditUser({ ...editUser, username: e.target.value })
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editUser.password}
                    onChange={(e) =>
                      setEditUser({ ...editUser, password: e.target.value })
                    }
                  />
                ) : visiblePasswords[user.username] &&
                  localPasswords[user.username] ? (
                  localPasswords[user.username]
                ) : (
                  "********"
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={() => saveEdit(user.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => togglePassword(user.username)}>
                      {visiblePasswords[user.username] ? "Hide" : "Show"}
                    </button>
                    <button onClick={() => startEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
