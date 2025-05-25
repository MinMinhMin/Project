import React from "react";
import "../styles/AdminPage.css";
import AdminPage_Controller from "../controllers/AdminPage_Controller";
import UserList from "../components/Admin/UserList";
import ParkingList from "../components/Admin/ParkingList";

export default function AdminPage() {
  const {
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
  } = AdminPage_Controller();
  return (
    <UserList/>
  );
}
