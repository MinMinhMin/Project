import React, { useState, useEffect } from "react";
import styles from "../../styles/admin/Userlist.module.css";
import axios from "axios";

const backendURL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

const MainScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formEditData, setFormEditData] = useState({
    tenNguoiDung: "",
    tenDangNhap: "",
    matKhau: "",
    lienHe: "",
  });

  const handleChange = (e, modalType) => {
    const { id, value } = e.target;
    if (modalType === "add") {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    } else if (modalType === "edit") {
      setFormEditData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  async function fetchUserData(searchPattern = "") {
    try {
      const url = searchPattern
        ? `${backendURL}/user/search?pattern=${encodeURIComponent(
            searchPattern
          )}`
        : `${backendURL}/user/get`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response.data);
      const transformedData = response.data.map((user) => ({
        tenNguoiDung: user.full_name || "Chưa cập nhật",
        idUser: user.id,
        userName: user.username,
        vaiTro: user.role,
        lienHe: user.phone_number || "Chưa cập nhật",
      }));
      setUserData(transformedData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  }

  useEffect(() => {
    if (!token) return;
    fetchUserData();
  }, [token]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUserData(searchTerm);
    }, 500); // Debounce for 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  async function addUser(username, password) {
    try {
      const response = await axios.post(
        `${backendURL}/user/create`,
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Thêm người dùng thành công:", response.data);
      fetchUserData(searchTerm);
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  }

  async function updateUser(userId, data) {
    try {
      const response = await axios.put(
        `${backendURL}/user/update/${userId}`,
        {
          full_name: data.tenNguoiDung,
          username: data.tenDangNhap,
          password: data.matKhau || undefined,
          phone_number: data.lienHe,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cập nhật người dùng thành công:", response.data);
      fetchUserData(searchTerm);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  }

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormEditData({
      tenNguoiDung: user.tenNguoiDung,
      tenDangNhap: user.userName,
      matKhau: "",
      lienHe: user.lienHe,
      vaiTro: user.vaiTro,
    });
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
    setFormEditData({
      tenNguoiDung: "",
      tenDangNhap: "",
      matKhau: "",
      lienHe: "",
      vaiTro: "",
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log("Tên đăng nhập:", formData.username);
    console.log("Mật khẩu", formData.password);
    addUser(formData.username, formData.password);
    handleCloseModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Sửa người dùng:", formEditData);
    updateUser(selectedUser.idUser, formEditData);
    handleCloseModal();
  };

  const handleDeleteConfirm = () => {
    async function deleteUser(userId) {
      try {
        const response = await axios.delete(
          `${backendURL}/user/delete/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Xóa người dùng thành công:", response.data);
        fetchUserData(searchTerm);
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
    deleteUser(selectedUser.idUser);
    console.log("Xóa người dùng:", selectedUser);
    handleCloseModal();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <span className={styles.mainTitle}>
          Danh sách người sử dụng phần mềm
        </span>
      </div>
      <div className={styles.addAndNumber}>
        <div className={styles.SearchContainer}>
          <div className={styles.Search}>
            <img src="/assets/magnifier.svg" alt="Search" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <img
            src="/assets/Vector.svg"
            alt="X"
            style={{ cursor: "pointer" }}
            onClick={() => setSearchTerm("")}
          />
        </div>
        <button className={styles.addContainer} onClick={handleAdd}>
          <span className={styles.addUser}>Thêm mới</span>
          <img src="/assets/Add User.svg" alt="add" />
        </button>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.listUser}>
          <thead>
            <tr>
              <th className={styles.colIndex}>#</th>
              <th className={styles.colId}>ID User</th>
              <th className={styles.colName}>Tên người dùng</th>
              <th className={styles.colUsername}>Tên đăng nhập</th>
              <th className={styles.colRole}>Vai trò</th>
              <th className={styles.colContact}>Liên hệ</th>
              <th className={styles.colAction}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.odd : styles.even}
              >
                <td className={styles.colIndex}>{index + 1}</td>
                <td className={styles.colId}>{user.idUser}</td>
                <td className={styles.colName}>{user.tenNguoiDung}</td>
                <td className={styles.colBirthday}>{user.userName}</td>
                <td className={styles.colRole}>{user.vaiTro}</td>
                <td className={styles.colContact}>{user.lienHe}</td>
                <td className={styles.colAction}>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleEdit(user)}
                  >
                    <img src="/assets/edit-contained.svg" alt="edit" />
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleDelete(user)}
                  >
                    <img src="/assets/Trash.svg" alt="trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm Người Dùng */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Thêm Người Dùng Mới</h2>
            <div className={styles.form}>
              <div className={styles.modalField}>
                <label>Tên đăng nhập:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleChange(e, "add")}
                  required
                />
              </div>
              <div className={styles.modalField}>
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e, "add")}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="button" onClick={handleAddSubmit}>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sửa Người Dùng */}
      {showEditModal && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Sửa Thông Tin Người Dùng</h2>
            <div className={styles.form}>
              <div className={styles.modalField}>
                <label>Tên người dùng:</label>
                <input
                  type="text"
                  id="tenNguoiDung"
                  value={formEditData.tenNguoiDung}
                  onChange={(e) => handleChange(e, "edit")}
                  required
                />
              </div>
              <div className={styles.modalField}>
                <label>Tên đăng nhập:</label>
                <input
                  type="text"
                  id="tenDangNhap"
                  value={formEditData.tenDangNhap}
                  onChange={(e) => handleChange(e, "edit")}
                  required
                />
              </div>
              <div className={styles.modalField}>
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  id="matKhau"
                  value={formEditData.matKhau}
                  onChange={(e) => handleChange(e, "edit")}
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div className={styles.modalField}>
                <label>Liên hệ:</label>
                <input
                  type="tel"
                  id="lienHe"
                  value={formEditData.lienHe}
                  onChange={(e) => handleChange(e, "edit")}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="button" onClick={handleEditSubmit}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xóa Người Dùng */}
      {showDeleteModal && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Xác Nhận Xóa</h2>
            <p>
              Bạn có chắc chắn muốn xóa người dùng{" "}
              <strong>{selectedUser.tenNguoiDung}</strong>?
            </p>
            <div className={styles.modalActions}>
              <button type="button" onClick={handleCloseModal}>
                Hủy
              </button>
              <button type="button" onClick={handleDeleteConfirm}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.nextPage}></div>
    </div>
  );
};

export default MainScreen;
