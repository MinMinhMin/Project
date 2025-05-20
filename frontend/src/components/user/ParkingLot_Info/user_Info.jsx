import React, { useState } from 'react';
import styles from '../../../styles/User_Info.module.css';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    username: 'Quang Anh',
    userId: 'APT-1234',
    role: 'Users',
    password: '********',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>📋 Thông tin chủ bãi đỗ</h2>
          <p className={styles.subtitle}>Thông tin cá nhân của chủ sở hữu bãi đỗ xe</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editButton}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>User Name</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          className={styles.input + (!isEditing ? ' ' + styles.readOnly : '')}
          readOnly={!isEditing}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>User ID</label>
        <input
          type="text"
          name="userId"
          value={userInfo.userId}
          onChange={handleChange}
          className={styles.input + ' ' + styles.readOnly}
          readOnly
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Role</label>
        <input
          type="text"
          name="role"
          value={userInfo.role}
          onChange={handleChange}
          className={styles.input + ' ' + styles.readOnly}
          readOnly
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            className={styles.input + (!isEditing ? ' ' + styles.readOnly : '')}
            readOnly={!isEditing}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={styles.toggleButton}
          >
            {showPassword ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
      </div>

      <button
        className={styles.saveButton}
        disabled={!isEditing}
      >
        SAVE
      </button>
    </div>
  );
};

export default UserInfo;
