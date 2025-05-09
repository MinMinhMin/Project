import React, { useEffect, useState } from "react";
import {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../services/AdminPage";

export default function AdminPage_Controller() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({ username: "", password: "" });
  const [localPasswords, setLocalPasswords] = useState({});
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const fetchUsers = async () => {
    getUser(setUsers, setError);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    createUser(newUser, setNewUser, setError, fetchUsers, setLocalPasswords);
  };

  const togglePassword = (username) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [username]: !prev[username],
    }));
  };

  const handleDelete = async (id) => {
    deleteUser(id, fetchUsers, setError);
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
    updateUser(
      userId,
      editUser,
      setLocalPasswords,
      fetchUsers,
      cancelEdit,
      setError
    );
  };

  return {
    users,
    error,
    newUser,
    editIndex,
    editUser,
    localPasswords,
    visiblePasswords,
    setEditUser,
    handleInputChange,
    handleCreateUser,
    togglePassword,
    handleDelete,
    startEdit,
    cancelEdit,
    saveEdit,
  };
}
