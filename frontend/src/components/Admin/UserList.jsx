import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Admin/Userlist.module.css";

const MainScreen = ({
  Number_User = 30
}) => {
const data = [
  {
    tenNguoiDung: "Nguyễn Thị L",
    idUser: "U011",
    tenDangNhap: "nguyenthil",
    vaiTro: "Người dùng",
    lienHe: "nguyenthil@example.com",
  },
  {
    tenNguoiDung: "Trần Văn M",
    idUser: "U012",
    tenDangNhap: "tranvanm",
    vaiTro: "Nhân viên",
    lienHe: "tranvanm@example.com",
  },
  {
    tenNguoiDung: "Lê Thị N",
    idUser: "U013",
    tenDangNhap: "lethin",
    vaiTro: "Quản trị viên",
    lienHe: "lethin@example.com",
  },
  {
    tenNguoiDung: "Phạm Văn O",
    idUser: "U014",
    tenDangNhap: "phamvano",
    vaiTro: "Người dùng",
    lienHe: "phamvano@example.com",
  },
  {
    tenNguoiDung: "Hoàng Thị P",
    idUser: "U015",
    tenDangNhap: "hoangthip",
    vaiTro: "Nhân viên",
    lienHe: "hoangthip@example.com",
  },
  {
    tenNguoiDung: "Đặng Văn Q",
    idUser: "U016",
    tenDangNhap: "dangvanq",
    vaiTro: "Quản trị viên",
    lienHe: "dangvanq@example.com",
  },
  {
    tenNguoiDung: "Bùi Thị R",
    idUser: "U017",
    tenDangNhap: "buithir",
    vaiTro: "Người dùng",
    lienHe: "buithir@example.com",
  },
  {
    tenNguoiDung: "Vũ Văn S",
    idUser: "U018",
    tenDangNhap: "vuvans",
    vaiTro: "Nhân viên",
    lienHe: "vuvans@example.com",
  },
  {
    tenNguoiDung: "Ngô Thị T",
    idUser: "U019",
    tenDangNhap: "ngothit",
    vaiTro: "Người dùng",
    lienHe: "ngothit@example.com",
  },
  {
    tenNguoiDung: "Mai Văn U",
    idUser: "U020",
    tenDangNhap: "maivanu",
    vaiTro: "Quản trị viên",
    lienHe: "maivanu@example.com",
  },
  {
    tenNguoiDung: "Lý Thị V",
    idUser: "U021",
    tenDangNhap: "lythiv",
    vaiTro: "Nhân viên",
    lienHe: "lythiv@example.com",
  },
  {
    tenNguoiDung: "Tô Văn W",
    idUser: "U022",
    tenDangNhap: "tovanw",
    vaiTro: "Người dùng",
    lienHe: "tovanw@example.com",
  },
  {
    tenNguoiDung: "Châu Thị X",
    idUser: "U023",
    tenDangNhap: "chauthix",
    vaiTro: "Nhân viên",
    lienHe: "chauthix@example.com",
  },
  {
    tenNguoiDung: "Đỗ Văn Y",
    idUser: "U024",
    tenDangNhap: "dovany",
    vaiTro: "Quản trị viên",
    lienHe: "dovany@example.com",
  },
  {
    tenNguoiDung: "Hà Thị Z",
    idUser: "U025",
    tenDangNhap: "hathiz",
    vaiTro: "Người dùng",
    lienHe: "hathiz@example.com",
  },
  {
    tenNguoiDung: "Nguyễn Thị L",
    idUser: "U011",
    tenDangNhap: "nguyenthil",
    vaiTro: "Người dùng",
    lienHe: "nguyenthil@example.com",
  },
  {
    tenNguoiDung: "Trần Văn M",
    idUser: "U012",
    tenDangNhap: "tranvanm",
    vaiTro: "Nhân viên",
    lienHe: "tranvanm@example.com",
  },
  {
    tenNguoiDung: "Lê Thị N",
    idUser: "U013",
    tenDangNhap: "lethin",
    vaiTro: "Quản trị viên",
    lienHe: "lethin@example.com",
  },
  {
    tenNguoiDung: "Phạm Văn O",
    idUser: "U014",
    tenDangNhap: "phamvano",
    vaiTro: "Người dùng",
    lienHe: "phamvano@example.com",
  },
  {
    tenNguoiDung: "Hoàng Thị P",
    idUser: "U015",
    tenDangNhap: "hoangthip",
    vaiTro: "Nhân viên",
    lienHe: "hoangthip@example.com",
  },
  {
    tenNguoiDung: "Đặng Văn Q",
    idUser: "U016",
    tenDangNhap: "dangvanq",
    vaiTro: "Quản trị viên",
    lienHe: "dangvanq@example.com",
  },
  {
    tenNguoiDung: "Bùi Thị R",
    idUser: "U017",
    tenDangNhap: "buithir",
    vaiTro: "Người dùng",
    lienHe: "buithir@example.com",
  },
  {
    tenNguoiDung: "Vũ Văn S",
    idUser: "U018",
    tenDangNhap: "vuvans",
    vaiTro: "Nhân viên",
    lienHe: "vuvans@example.com",
  },
  {
    tenNguoiDung: "Ngô Thị T",
    idUser: "U019",
    tenDangNhap: "ngothit",
    vaiTro: "Người dùng",
    lienHe: "ngothit@example.com",
  },
  {
    tenNguoiDung: "Mai Văn U",
    idUser: "U020",
    tenDangNhap: "maivanu",
    vaiTro: "Quản trị viên",
    lienHe: "maivanu@example.com",
  },
  {
    tenNguoiDung: "Lý Thị V",
    idUser: "U021",
    tenDangNhap: "lythiv",
    vaiTro: "Nhân viên",
    lienHe: "lythiv@example.com",
  },
  {
    tenNguoiDung: "Tô Văn W",
    idUser: "U022",
    tenDangNhap: "tovanw",
    vaiTro: "Người dùng",
    lienHe: "tovanw@example.com",
  },
  {
    tenNguoiDung: "Châu Thị X",
    idUser: "U023",
    tenDangNhap: "chauthix",
    vaiTro: "Nhân viên",
    lienHe: "chauthix@example.com",
  },
  {
    tenNguoiDung: "Đỗ Văn Y",
    idUser: "U024",
    tenDangNhap: "dovany",
    vaiTro: "Quản trị viên",
    lienHe: "dovany@example.com",
  },
  {
    tenNguoiDung: "Hà Thị Z",
    idUser: "U025",
    tenDangNhap: "hathiz",
    vaiTro: "Người dùng",
    lienHe: "hathiz@example.com",
  }
  
];



  return (
    <div className= {styles.mainContainer}>
      <div className={styles.titleContainer}>
        <span className={styles.mainTitle}>Danh sách người sử dụng phần mềm</span>
      </div>
      <div className={styles.addAndNumber}>
        <div className={styles.NumblePeople}>
          <span className={styles.People}>Tổng số người sử dụng:</span>
          <div className={styles.numberContainer}>
            <span className={styles.Number}>{Number_User}</span>
          </div>
        </div>
        <button className={styles.addContainer}>
          <span className={styles.addUser}>Thêm người sử dụng</span>
          <img src="/assets/Add User.svg" alt="add" />
        </button>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.listUser}>
            <thead>
              <tr>
                <th className={styles.colIndex}>#</th>
                <th className={styles.colName}>Tên người dùng</th>
                <th className={styles.colId}>ID User</th>
                <th className={styles.colUsername}>Tên đăng nhập</th>
                <th className={styles.colRole}>Vai trò</th>
                <th className={styles.colContact}>Liên hệ</th>
                <th className={styles.colAction}>Chỉnh sửa</th>
                <th className={styles.colDetail}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? styles.odd : styles.even}
                >
                  <td className={styles.colIndex}>{index + 1}</td>
                  <td className={styles.colName}>{user.tenNguoiDung}</td>
                  <td className={styles.colId}>{user.idUser}</td>
                  <td className={styles.colUsername}>{user.tenDangNhap}</td>
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
                  <td className={styles.colDetail}>
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