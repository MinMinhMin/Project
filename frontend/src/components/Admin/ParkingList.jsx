// ParkingList.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/admin/ParkingList.module.css";
import axios from "axios";
import { ro } from "date-fns/locale";

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const backendUrl = import.meta.env.VITE_API_URL;

const ParkingList = () => {
  const location = useLocation();

  useEffect(() => {
    if (role !== "admin") {
      window.location.reload();
    }

    console.log("Role:", role);
  }, [location.pathname, role]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios.get(`${backendUrl}/parking_lot/get/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Parking data fetched successfully:", response.data);
      const transformedData = response.data.map((item, index) => ({
        id: index + 1,
        code: String(item.id),
        name: item.name,
        location: item.location,
        capacity: item.capacity,
        userId: item.user_id,
        userName: item.userName, // Use API-provided userName
        contact: item.contact, // Use API-provided contact
      }));

      setData(transformedData);
      console.log("Transformed parking data:", transformedData);
    } catch (error) {
      console.error("Error fetching parking data:", error);
    }
  }

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  const filteredData = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.parkingContainer}>
      <h1 className={styles.heading}>Danh sách bãi đỗ của người dùng</h1>

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
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Số thứ tự</th>
              <th className={styles.tableHeader}>Mã bãi đỗ xe</th>
              <th className={styles.tableHeader}>Tên bãi đỗ</th>
              <th className={styles.tableHeader}>Vị trí bãi đỗ</th>
              <th className={styles.tableHeader}>Sức chứa</th>
              <th className={styles.tableHeader}>Chủ bãi đỗ</th>
              <th className={styles.tableHeader}>Thông tin liên hệ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.id}</td>
                  <td className={styles.tableCell}>{item.code}</td>
                  <td className={styles.tableCell}>{item.name}</td>
                  <td className={styles.tableCell}>{item.location}</td>
                  <td className={styles.tableCell}>{item.capacity}</td>
                  <td className={styles.tableCell}>{item.userName}</td>
                  <td className={styles.tableCell}>{item.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.noData}>
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages >= 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${styles.paginationButton} ${
                currentPage === page ? styles.active : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default ParkingList;
