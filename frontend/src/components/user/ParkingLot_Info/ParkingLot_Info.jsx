import React, { useState } from "react";
import styles from "../../../styles/ParkingLot_Info.module.css";
import { useNavigate, Link } from "react-router-dom";
import ParkingForm from "./ParkingForm";
import EditForm from "./EditForm";
import DeleteConfirmForm from "./DeleteConfirmForm"; // Form xác nhận xóa

const ParkingLot_Info = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedLotId, setSelectedLotId] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteLotId, setDeleteLotId] = useState(null);

  const [parkingLots, setParkingLots] = useState([
    { id: 1, code: '0001', name: 'VNU - UEB', location: 'Toà A1', capacity: 500, remaining: 200, status: 'Trống nhiều' },
    { id: 2, code: '00002', name: 'VNU - UL', location: 'Toà A2', capacity: 300, remaining: 100, status: 'Trống nhiều' },
    { id: 3, code: '0003', name: 'VNU - KTX', location: 'KT túc xá', capacity: 200, remaining: 0, status: 'Hết chỗ' },
    { id: 4, code: '0004', name: 'VNU - NN', location: 'Toà E1', capacity: 200, remaining: 190, status: 'Sắp đầy' },
    { id: 5, code: '0005', name: 'VNU - ULIS1', location: 'Hồ trường', capacity: 50, remaining: 40, status: 'Trống nhiều' },
    { id: 6, code: '0006', name: 'VNU - ULIS2', location: 'Sân bóng', capacity: 450, remaining: 250, status: 'Trống nhiều' },
    { id: 7, code: '0007', name: 'VNU-GIS', location: 'Thư viện', capacity: 123, remaining: 60, status: 'Trống nhiều' },
    { id: 8, code: '0008', name: 'VNU-UET', location: 'Toà G2', capacity: 456, remaining: 450, status: 'Sắp đầy' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const lotsPerPage = 5;

  const handleCreateParkingLot = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleEdit = (id) => {
    setSelectedLotId(id);
    setShowEditForm(true);
  };
  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedLotId(null);
  };

  const handleDelete = (id) => {
    setDeleteLotId(id);
    setShowDeleteForm(true);
  };
  const handleCloseDeleteForm = () => {
    setDeleteLotId(null);
    setShowDeleteForm(false);
  };
  const handleConfirmDelete = () => {
    setParkingLots(parkingLots.filter((lot) => lot.id !== deleteLotId));
    setDeleteLotId(null);
    setShowDeleteForm(false);
  };

  const indexOfLastLot = currentPage * lotsPerPage;
  const indexOfFirstLot = indexOfLastLot - lotsPerPage;
  const currentLots = parkingLots.slice(indexOfFirstLot, indexOfLastLot);
  const totalPages = Math.ceil(parkingLots.length / lotsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'Trống nhiều':
        return <div className={`${styles["status-badge"]} ${styles["status-available"]}`}>• Trống nhiều</div>;
      case 'Sắp đầy':
        return <div className={`${styles["status-badge"]} ${styles["status-almost-full"]}`}>• Sắp đầy</div>;
      case 'Hết chỗ':
        return <div className={`${styles["status-badge"]} ${styles["status-full"]}`}>• Hết chỗ</div>;
      default:
        return <div className={styles["status-badge"]}>{status}</div>;
    }
  };

  return (
    <div className={styles["parking-management"]}>
      <div className={styles["parking-info-section"]}>
        <div className={styles["section-header"]}>
          <div className={styles["header-icon"]}>
            <i className={styles["car-icon"]}>⌂</i>
            <span>Thông tin về bãi đỗ</span>
          </div>
          <button className={styles["create-btn"]} onClick={handleCreateParkingLot}>
            <span className={styles["plus-icon"]}>+</span>
            Tạo bãi đỗ mới
          </button>
        </div>

        <div className={styles["section-subheader"]}>
          Danh sách thông tin cần thiết về các bãi đỗ xe của bạn
        </div>

        <div className={styles["parking-table-container"]}>
          <table className={styles["parking-table"]}>
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Mã bãi đỗ xe</th>
                <th>Tên bãi đỗ</th>
                <th>Vị trí bãi đỗ</th>
                <th>Sức chứa</th>
                <th>Vị trí còn trống</th>
                <th>Trạng thái</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentLots.map((lot) => (
                <tr key={lot.id}>
                  <td>{lot.id}</td>
                  <td>{lot.code}</td>
                  <td>{lot.name}</td>
                  <td>{lot.location}</td>
                  <td>{lot.capacity}</td>
                  <td>{lot.remaining}</td>
                  <td>{renderStatus(lot.status)}</td>
                  <td>
                    <button
                      className={styles["edit-btn"]}
                      onClick={() => handleEdit(lot.id)}
                    >
                      <i className={styles["edit-icon"]}>✎</i>
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles["edit-btn"]}
                      onClick={() => handleDelete(lot.id)}
                    >
                      <i className={styles["edit-icon"]}>🗑</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles["pagination"]}>
          <button
            className={styles["page-btn"]}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles["page-btn"]} ${currentPage === page ? styles["active"] : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={styles["page-btn"]}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>

        {showForm && (
          <div className={styles["form-overlay"]}>
            <ParkingForm onClose={handleCloseForm} />
          </div>
        )}
        {showEditForm && (
          <div className={styles["form-overlay"]}>
            <EditForm
              onClose={handleCloseEditForm}
              lotId={selectedLotId}
              parkingLots={parkingLots}
            />
          </div>
        )}
        {showDeleteForm && (
          <div className={styles["form-overlay"]}>
            <DeleteConfirmForm
              lotId={deleteLotId}
              onClose={handleCloseDeleteForm}
              onConfirm={handleConfirmDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingLot_Info;
