import React, { useState } from "react";
import styles from "../../styles/Admin/Userlist.module.css";

const MainScreen = ({ Number_User = 30 }) => {
  const data = [
    { tenNguoiDung: "Nguyễn Thị L", idUser: "U011", ngaySinh: "nguyenthil", vaiTro: "Người dùng", lienHe: "nguyenthil@example.com" },
    { tenNguoiDung: "Trần Văn M", idUser: "U012", ngaySinh: "tranvanm", vaiTro: "Nhân viên", lienHe: "tranvanm@example.com" },
    { tenNguoiDung: "Lê Thị N", idUser: "U013", ngaySinh: "lethin", vaiTro: "Quản trị viên", lienHe: "lethin@example.com" },
    { tenNguoiDung: "Phạm Văn O", idUser: "U014", ngaySinh: "phamvano", vaiTro: "Người dùng", lienHe: "phamvano@example.com" },
    { tenNguoiDung: "Hoàng Thị P", idUser: "U015", ngaySinh: "hoangthip", vaiTro: "Nhân viên", lienHe: "hoangthip@example.com" },
    { tenNguoiDung: "Đặng Văn Q", idUser: "U016", ngaySinh: "dangvanq", vaiTro: "Quản trị viên", lienHe: "dangvanq@example.com" },
    { tenNguoiDung: "Bùi Thị R", idUser: "U017", ngaySinh: "buithir", vaiTro: "Người dùng", lienHe: "buithir@example.com" },
    { tenNguoiDung: "Vũ Văn S", idUser: "U018", ngaySinh: "vuvans", vaiTro: "Nhân viên", lienHe: "vuvans@example.com" },
    { tenNguoiDung: "Ngô Thị T", idUser: "U019", ngaySinh: "ngothit", vaiTro: "Người dùng", lienHe: "ngothit@example.com" },
    { tenNguoiDung: "Mai Văn U", idUser: "U020", ngaySinh: "maivanu", vaiTro: "Quản trị viên", lienHe: "maivanu@example.com" },
    { tenNguoiDung: "Lý Thị V", idUser: "U021", ngaySinh: "lythiv", vaiTro: "Nhân viên", lienHe: "lythiv@example.com" },
    { tenNguoiDung: "Tô Văn W", idUser: "U022", ngaySinh: "tovanw", vaiTro: "Người dùng", lienHe: "tovanw@example.com" },
    { tenNguoiDung: "Châu Thị X", idUser: "U023", ngaySinh: "chauthix", vaiTro: "Nhân viên", lienHe: "chauthix@example.com" },
    { tenNguoiDung: "Đỗ Văn Y", idUser: "U024", ngaySinh: "dovany", vaiTro: "Quản trị viên", lienHe: "dovany@example.com" },
    { tenNguoiDung: "Hà Thị Z", idUser: "U025", ngaySinh: "hathiz", vaiTro: "Người dùng", lienHe: "hathiz@example.com" },
    { tenNguoiDung: "Nguyễn Thị L", idUser: "U011", ngaySinh: "nguyenthil1", vaiTro: "Người dùng", lienHe: "nguyenthil@example.com" },
    { tenNguoiDung: "Trần Văn M", idUser: "U012", ngaySinh: "tranvanm1", vaiTro: "Nhân viên", lienHe: "tranvanm@example.com" },
    { tenNguoiDung: "Lê Thị N", idUser: "U013", ngaySinh: "lethin1", vaiTro: "Quản trị viên", lienHe: "lethin@example.com" },
    { tenNguoiDung: "Phạm Văn O", idUser: "U014", ngaySinh: "phamvano1", vaiTro: "Người dùng", lienHe: "phamvano@example.com" },
    { tenNguoiDung: "Hoàng Thị P", idUser: "U015", ngaySinh: "hoangthip1", vaiTro: "Nhân viên", lienHe: "hoangthip@example.com" },
    { tenNguoiDung: "Đặng Văn Q", idUser: "U016", ngaySinh: "dangvanq1", vaiTro: "Quản trị viên", lienHe: "dangvanq@example.com" },
    { tenNguoiDung: "Bùi Thị R", idUser: "U017", ngaySinh: "buithir1", vaiTro: "Người dùng", lienHe: "buithir@example.com" },
    { tenNguoiDung: "Vũ Văn S", idUser: "U018", ngaySinh: "vuvans1", vaiTro: "Nhân viên", lienHe: "vuvans@example.com" },
    { tenNguoiDung: "Ngô Thị T", idUser: "U019", ngaySinh: "ngothit1", vaiTro: "Người dùng", lienHe: "ngothit@example.com" },
    { tenNguoiDung: "Mai Văn U", idUser: "U020", ngaySinh: "maivanu1", vaiTro: "Quản trị viên", lienHe: "maivanu@example.com" },
    { tenNguoiDung: "Lý Thị V", idUser: "U021", ngaySinh: "lythiv1", vaiTro: "Nhân viên", lienHe: "lythiv@example.com" },
    { tenNguoiDung: "Tô Văn W", idUser: "U022", ngaySinh: "tovanw1", vaiTro: "Người dùng", lienHe: "tovanw@example.com" },
    { tenNguoiDung: "Châu Thị X", idUser: "U023", ngaySinh: "chauthix1", vaiTro: "Nhân viên", lienHe: "chauthix@example.com" },
    { tenNguoiDung: "Đỗ Văn Y", idUser: "U024", ngaySinh: "dovany1", vaiTro: "Quản trị viên", lienHe: "dovany@example.com" },
    { tenNguoiDung: "Hà Thị Z", idUser: "U025", ngaySinh: "hathiz1", vaiTro: "Người dùng", lienHe: "hathiz@example.com" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredData = data.filter((user) =>
    Object.values(user).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
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
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic thêm người dùng (ví dụ: gửi dữ liệu tới API)
    console.log("Thêm người dùng mới");
    handleCloseModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic sửa người dùng (ví dụ: gửi dữ liệu tới API)
    console.log("Sửa người dùng:", selectedUser);
    handleCloseModal();
  };

  const handleDeleteConfirm = () => {
    // Xử lý logic xóa người dùng (ví dụ: gửi dữ liệu tới API)
    console.log("Xóa người dùng:", selectedUser);
    handleCloseModal();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <span className={styles.mainTitle}>Danh sách người sử dụng phần mềm</span>
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
            {filteredData.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.odd : styles.even}
              >
                <td className={styles.colIndex}>{index + 1}</td>
                <td className={styles.colId}>{user.idUser}</td>
                <td className={styles.colName}>{user.tenNguoiDung}</td>
                <td className={styles.colBirthday}>{user.ngaySinh}</td>
                <td className={styles.colRole}>{user.vaiTro}</td>
                <td className={styles.colContact}>{user.lienHe}</td>
                <td className={styles.colAction}>
                  <button className={styles.iconButton} onClick={() => handleEdit(user)}>
                    <img src="/assets/edit-contained.svg" alt="edit" />
                  </button>
                  <button className={styles.iconButton} onClick={() => handleDelete(user)}>
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
            <form onSubmit={handleAddSubmit}>
              <div className={styles.modalField}>
                <label>Tên người dùng:</label>
                <input type="text" required />
              </div>
              <div className={styles.modalField}>
                <label>ID User:</label>
                <input type="text" required />
              </div>
              <div className={styles.modalField}>
                <label>Tên đăng nhập:</label>
                <input type="text" required />
              </div>
              <div className={styles.modalField}>
                <label>Mật khẩu:</label>
                <input type="password" required />
              </div>
              <div className={styles.modalField}>
                <label>Vai trò:</label>
                <select required>
                  <option value="Người dùng">Người dùng</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Quản trị viên">Quản trị viên</option>
                </select>
              </div>
              <div className={styles.modalField}>
                <label>Liên hệ:</label>
                <input type="email" required />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="submit">Thêm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Sửa Người Dùng */}
      {showEditModal && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Sửa Thông Tin Người Dùng</h2>
            <form onSubmit={handleEditSubmit}>
              <div className={styles.modalField}>
                <label>Tên người dùng:</label>
                <input type="text" defaultValue={selectedUser.tenNguoiDung} required />
              </div>
              <div className={styles.modalField}>
                <label>ID User:</label>
                <input type="text" defaultValue={selectedUser.idUser} disabled />
              </div>
              <div className={styles.modalField}>
                <label>Tên đăng nhập:</label>
                <input type="text" defaultValue={selectedUser.ngaySinh} required />
              </div>
              <div className={styles.modalField}>
                <label>Mật khẩu:</label>
                <input type="password" placeholder="Nhập mật khẩu mới" />
              </div>
              <div className={styles.modalField}>
                <label>Vai trò:</label>
                <select defaultValue={selectedUser.vaiTro} required>
                  <option value="Người dùng">Người dùng</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Quản trị viên">Quản trị viên</option>
                </select>
              </div>
              <div className={styles.modalField}>
                <label>Liên hệ:</label>
                <input type="email" defaultValue={selectedUser.lienHe} required />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="submit">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xóa Người Dùng */}
      {showDeleteModal && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Xác Nhận Xóa</h2>
            <p>Bạn có chắc chắn muốn xóa người dùng <strong>{selectedUser.tenNguoiDung}</strong>?</p>
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