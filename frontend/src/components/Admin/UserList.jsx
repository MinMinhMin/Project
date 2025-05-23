import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Admin/Userlist.module.css";

const MainScreen = ({
  Number_User = 30
}) => {
const data = [
  {
    tenNguoiDung: "Nguyễn Thị L",
    idUser: "U011",
    ngaySinh: "12/03/1995",
    vaiTro: "Người dùng",
    lienHe: "nguyenthil@example.com",
  },
  {
    tenNguoiDung: "Trần Văn M",
    idUser: "U012",
    ngaySinh: "25/07/1992",
    vaiTro: "Nhân viên",
    lienHe: "tranvanm@example.com",
  },
  {
    tenNguoiDung: "Lê Thị N",
    idUser: "U013",
    ngaySinh: "08/09/1990",
    vaiTro: "Quản trị viên",
    lienHe: "lethin@example.com",
  },
  {
    tenNguoiDung: "Phạm Văn O",
    idUser: "U014",
    ngaySinh: "19/11/1993",
    vaiTro: "Người dùng",
    lienHe: "phamvano@example.com",
  },
  {
    tenNguoiDung: "Hoàng Thị P",
    idUser: "U015",
    ngaySinh: "05/01/1994",
    vaiTro: "Nhân viên",
    lienHe: "hoangthip@example.com",
  },
  {
    tenNguoiDung: "Đặng Văn Q",
    idUser: "U016",
    ngaySinh: "30/06/1989",
    vaiTro: "Quản trị viên",
    lienHe: "dangvanq@example.com",
  },
  {
    tenNguoiDung: "Bùi Thị R",
    idUser: "U017",
    ngaySinh: "14/04/1996",
    vaiTro: "Người dùng",
    lienHe: "buithir@example.com",
  },
  {
    tenNguoiDung: "Vũ Văn S",
    idUser: "U018",
    ngaySinh: "21/02/1991",
    vaiTro: "Nhân viên",
    lienHe: "vuvans@example.com",
  },
  {
    tenNguoiDung: "Ngô Thị T",
    idUser: "U019",
    ngaySinh: "03/10/1993",
    vaiTro: "Người dùng",
    lienHe: "ngothit@example.com",
  },
  {
    tenNguoiDung: "Mai Văn U",
    idUser: "U020",
    ngaySinh: "27/12/1988",
    vaiTro: "Quản trị viên",
    lienHe: "maivanu@example.com",
  },
  {
    tenNguoiDung: "Lý Thị V",
    idUser: "U021",
    ngaySinh: "09/08/1992",
    vaiTro: "Nhân viên",
    lienHe: "lythiv@example.com",
  },
  {
    tenNguoiDung: "Tô Văn W",
    idUser: "U022",
    ngaySinh: "16/05/1995",
    vaiTro: "Người dùng",
    lienHe: "tovanw@example.com",
  },
  {
    tenNguoiDung: "Châu Thị X",
    idUser: "U023",
    ngaySinh: "11/11/1991",
    vaiTro: "Nhân viên",
    lienHe: "chauthix@example.com",
  },
  {
    tenNguoiDung: "Đỗ Văn Y",
    idUser: "U024",
    ngaySinh: "04/04/1987",
    vaiTro: "Quản trị viên",
    lienHe: "dovany@example.com",
  },
  {
    tenNguoiDung: "Hà Thị Z",
    idUser: "U025",
    ngaySinh: "07/07/1994",
    vaiTro: "Người dùng",
    lienHe: "hathiz@example.com",
  },
  // Lặp lại dữ liệu
  {
    tenNguoiDung: "Nguyễn Thị L",
    idUser: "U011",
    ngaySinh: "12/03/1995",
    vaiTro: "Người dùng",
    lienHe: "nguyenthil@example.com",
  },
  {
    tenNguoiDung: "Trần Văn M",
    idUser: "U012",
    ngaySinh: "25/07/1992",
    vaiTro: "Nhân viên",
    lienHe: "tranvanm@example.com",
  },
  {
    tenNguoiDung: "Lê Thị N",
    idUser: "U013",
    ngaySinh: "08/09/1990",
    vaiTro: "Quản trị viên",
    lienHe: "lethin@example.com",
  },
  {
    tenNguoiDung: "Phạm Văn O",
    idUser: "U014",
    ngaySinh: "19/11/1993",
    vaiTro: "Người dùng",
    lienHe: "phamvano@example.com",
  },
  {
    tenNguoiDung: "Hoàng Thị P",
    idUser: "U015",
    ngaySinh: "05/01/1994",
    vaiTro: "Nhân viên",
    lienHe: "hoangthip@example.com",
  },
  {
    tenNguoiDung: "Đặng Văn Q",
    idUser: "U016",
    ngaySinh: "30/06/1989",
    vaiTro: "Quản trị viên",
    lienHe: "dangvanq@example.com",
  },
  {
    tenNguoiDung: "Bùi Thị R",
    idUser: "U017",
    ngaySinh: "14/04/1996",
    vaiTro: "Người dùng",
    lienHe: "buithir@example.com",
  },
  {
    tenNguoiDung: "Vũ Văn S",
    idUser: "U018",
    ngaySinh: "21/02/1991",
    vaiTro: "Nhân viên",
    lienHe: "vuvans@example.com",
  },
  {
    tenNguoiDung: "Ngô Thị T",
    idUser: "U019",
    ngaySinh: "03/10/1993",
    vaiTro: "Người dùng",
    lienHe: "ngothit@example.com",
  },
  {
    tenNguoiDung: "Mai Văn U",
    idUser: "U020",
    ngaySinh: "27/12/1988",
    vaiTro: "Quản trị viên",
    lienHe: "maivanu@example.com",
  },
  {
    tenNguoiDung: "Lý Thị V",
    idUser: "U021",
    ngaySinh: "09/08/1992",
    vaiTro: "Nhân viên",
    lienHe: "lythiv@example.com",
  },
  {
    tenNguoiDung: "Tô Văn W",
    idUser: "U022",
    ngaySinh: "16/05/1995",
    vaiTro: "Người dùng",
    lienHe: "tovanw@example.com",
  },
  {
    tenNguoiDung: "Châu Thị X",
    idUser: "U023",
    ngaySinh: "11/11/1991",
    vaiTro: "Nhân viên",
    lienHe: "chauthix@example.com",
  },
  {
    tenNguoiDung: "Đỗ Văn Y",
    idUser: "U024",
    ngaySinh: "04/04/1987",
    vaiTro: "Quản trị viên",
    lienHe: "dovany@example.com",
  },
  {
    tenNguoiDung: "Hà Thị Z",
    idUser: "U025",
    ngaySinh: "07/07/1994",
    vaiTro: "Người dùng",
    lienHe: "hathiz@example.com",
  }
];

const [searchTerm, setSearchTerm] = useState("");

const filteredData = data.filter((user) =>
  Object.values(user).some((val) =>
    val.toLowerCase().includes(searchTerm.toLowerCase())
  )
);




  return (
    <div className= {styles.mainContainer}>
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
        <button className={styles.addContainer}>
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
                <th className={styles.colUsername}>Ngày sinh</th>
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
                    <button className={styles.iconButton} onClick={() => handleViewDetail(user)}>
                      <img src="/assets/file-eye-02.svg" alt="view" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      <div className={styles.nextPage}></div>
    </div>
  );
};

export default MainScreen;