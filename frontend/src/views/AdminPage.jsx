import React from "react";
import "../styles/AdminPage.css";
import AdminPage_Controller from "../controllers/AdminPage_Controller";

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
