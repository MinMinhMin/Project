import React, { useState } from 'react';
import styles from '../../styles/admin/ParkingList.module.css';


const ParkingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  const parkingData = [
    { id: 1, code: "0001", name: "VNU - UEB", location: "Tòa A1", capacity: 500, userID: "APT-123", contact: "0123456987" },
    { id: 2, code: "0002", name: "VNU - UL", location: "Tòa A2", capacity: 300, userID: "APT-123", contact: "0123456987" },
    { id: 3, code: "0003", name: "VNU - KTX", location: "Kí túc xá", capacity: 200, userID: "APT-123", contact: "0123456987" },
    { id: 4, code: "0004", name: "VNU - NN", location: "Tòa E1", capacity: 200, userID: "APT-123", contact: "0123456987" },
    { id: 5, code: "0005", name: "VNU - ULIS1", location: "Hội trường", capacity: 50, userID: "APT-123", contact: "0123456987" },
    { id: 6, code: "0006", name: "VNU - ULIS2", location: "Sân bóng", capacity: 450, userID: "APT-123", contact: "0123456987" },
    { id: 7, code: "0007", name: "VNU - SIS", location: "Thư viện", capacity: 123, userID: "APT-123", contact: "0123456987" },
    { id: 8, code: "0008", name: "VNU - UET", location: "Tòa G2", capacity: 456, userID: "APT-123", contact: "0123456987" },
    { id: 9, code: "0009", name: "VNU - VNU", location: "Tòa H", capacity: 300, userID: "APT-123", contact: "012345678" },
    { id: 10, code: "0009", name: "VNU - VNU", location: "Tòa H", capacity: 300, userID: "APT-123", contact: "098123456" },
    { id: 11, code: "0009", name: "VNU - VNU", location: "Tòa H", capacity: 300, userID: "APT-123", contact: "098123456" },
  ];

  const filteredData = parkingData.filter(item =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <span
            className={styles.clearIcon}
            onClick={() => setSearchTerm('')}
          >
            ✕
          </span>
        )}
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
                  <td className={styles.tableCell}>{item.userID}</td>
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
              className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
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