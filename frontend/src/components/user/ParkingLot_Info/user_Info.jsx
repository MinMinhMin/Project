import React, { useState, useEffect } from "react";
import styles from "../../../styles/User_Info.module.css";
import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL;

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    contact: "",
    username: "",
    userId: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendUrl}/user/get_profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo({
        fullName: response.data.full_name || "",
        contact: response.data.phone_number || "",
        username: response.data.username || "",
        userId: response.data.id || "",
        role: response.data.role || "",
      });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user profile");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${backendUrl}/user/update_profile`,
        {
          full_name: userInfo.fullName,
          phone_number: userInfo.contact,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>📋 Thông tin chủ bãi đỗ</h2>
          <p className={styles.subtitle}>
            Thông tin cá nhân của chủ sở hữu bãi đỗ xe
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editButton}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.formGroup}>
        <label className={styles.label}>Tên người dùng</label>
        <input
          type="text"
          name="fullName"
          value={userInfo.fullName}
          onChange={handleChange}
          className={styles.input + (!isEditing ? " " + styles.readOnly : "")}
          readOnly={!isEditing}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Thông tin liên hệ</label>
        <input
          type="text"
          name="contact"
          value={userInfo.contact}
          onChange={handleChange}
          className={styles.input + (!isEditing ? " " + styles.readOnly : "")}
          readOnly={!isEditing}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Tên tài khoản</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          className={styles.input + " " + styles.readOnly}
          readOnly
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>User ID</label>
        <input
          type="text"
          name="userId"
          value={userInfo.userId}
          className={styles.input + " " + styles.readOnly}
          readOnly
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Quyền hạn người dùng</label>
        <input
          type="text"
          name="role"
          value={userInfo.role}
          className={styles.input + " " + styles.readOnly}
          readOnly
        />
      </div>
      <button
        className={styles.saveButton}
        disabled={!isEditing}
        onClick={handleSave}
      >
        SAVE
      </button>
    </div>
  );
};

export default UserInfo;
