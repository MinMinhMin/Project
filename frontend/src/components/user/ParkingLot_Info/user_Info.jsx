import React, { useState } from 'react';
import styles from '../../../styles/User_Info.module.css';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Văn A',
    contact: "0985123456",
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
        <label className={styles.label}>Tên người dùng</label>
        <input
          type="text"
          name="Tên người dùng"
          value={userInfo.fullName}
          onChange={handleChange}
          className={styles.input + (!isEditing ? ' ' + styles.readOnly : '')}
          readOnly ={!isEditing}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Thông tin liên hệ</label>
        <input
          type="text"
          name="Thông tin liên hệ"
          value={userInfo.contact}
          onChange={handleChange}
          className={styles.input + (!isEditing ? ' ' + styles.readOnly : '')}
          readOnly ={!isEditing}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tên tài khoản</label>
        <input
          type="text"
          name="Tên tài khoản"
          value={userInfo.username}
          onChange={handleChange}
          className={styles.input + ' ' + styles.readOnly  }
          readOnly 
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
        <label className={styles.label}>Quyền hạn người dùng</label>
        <input
          type="text"
          name="Quyền hạn người dùng"
          value={userInfo.role}
          onChange={handleChange}
          className={styles.input + ' ' + styles.readOnly}
          readOnly
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Mật khẩu</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="Mật khẩu"
            value={userInfo.password}
            onChange={handleChange}
            className={styles.input + ' ' + styles.readOnly}
            readOnly
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
