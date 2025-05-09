import React, { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL;

export async function getUser(setUsers, setError) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${backendUrl}/user/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(response.data);
  } catch (err) {
    setError(err.response?.data?.detail || "Failed to fetch users");
  }
}

export async function createUser(
  newUser,
  setNewUser,
  setError,
  fetchUsers,
  setLocalPasswords
) {
  const token = localStorage.getItem("token");

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
}

export async function deleteUser(id, fetchUsers, setError) {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${backendUrl}/user/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  } catch (err) {
    setError(err.response?.data?.detail || "Failed to delete user");
  }
}

export async function updateUser(
  userId,
  editUser,
  setLocalPasswords,
  fetchUsers,
  cancelEdit,
  setError
) {
  const token = localStorage.getItem("token");
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
}
