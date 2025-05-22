import React, { useState, useEffect, use } from "react";
import styles from "../../../styles/ParkingLot_Info.module.css";
import { useNavigate, Link } from "react-router-dom";
import ParkingForm from "./ParkingForm";
import EditForm from "./EditForm";
import DeleteConfirmForm from "./DeleteConfirmForm"; // Form xác nhận xóa

import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const ParkingLot_Info = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedLotId, setSelectedLotId] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteLotId, setDeleteLotId] = useState(null);

  const [parkingLots, setParkingLots] = useState([]);

  async function deleteParkingLot(id) {
    try {
      const res = await axios.delete(`${backendUrl}/parking_lot/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete response:", res.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  async function fetchParkinglot() {
    try {
      const res = await axios.get(`${backendUrl}/parking_lot/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", res.data);

      // Transform API data to match the frontend shape
      const transformedData = res.data.map((lot, index) => {
        const capacity = lot.capacity ?? 0; // fallback if null
        const remaining = lot.available_spots ?? 0;

        // Compute status based on available spots and capacity
        let status = "Không xác định";
        const ratio = remaining / capacity;

        if (capacity === 0) {
          status = "Không có sức chứa";
        } else if (ratio === 0) {
          status = "Hết chỗ";
        } else if (ratio < 0.1) {
          status = "Sắp đầy";
        } else {
          status = "Trống nhiều";
        }

        return {
          id: lot.id,
          code: lot.code ?? String(index + 1).padStart(4, "0"), // fallback code
          name: lot.name ?? "Chưa có tên",
          location: lot.location ?? "Không rõ",
          capacity: capacity,
          remaining: remaining,
          status: status,
        };
      });

      setParkingLots(transformedData);
    } catch (err) {
      console.error("API Error:", err);
    }
  }
  useEffect(() => {
    fetchParkinglot();
  }, [token]);

  const [currentPage, setCurrentPage] = useState(1);
  const lotsPerPage = 5;

  const handleCreateParkingLot = () => setShowForm(true);
  const handleCloseForm = async () => {
    setShowForm(false);
    await fetchParkinglot();
  };

  const handleEdit = (id) => {
    setSelectedLotId(id);
    setShowEditForm(true);
  };
  const handleCloseEditForm = async () => {
    setSelectedLotId(null);
    setShowEditForm(false);
    await fetchParkinglot();
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
    deleteParkingLot(deleteLotId);
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
      case "Trống nhiều":
        return (
          <div
            className={`${styles["status-badge"]} ${styles["status-available"]}`}
          >
            • Trống nhiều
          </div>
        );
      case "Sắp đầy":
        return (
          <div
            className={`${styles["status-badge"]} ${styles["status-almost-full"]}`}
          >
            • Sắp đầy
          </div>
        );
      case "Hết chỗ":
        return (
          <div className={`${styles["status-badge"]} ${styles["status-full"]}`}>
            • Hết chỗ
          </div>
        );
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
          <button
            className={styles["create-btn"]}
            onClick={handleCreateParkingLot}
          >
            <span className={styles["plus-icon"]}>+</span>
            Tạo bãi đỗ mới
          </button>
        </div>

        <div className={styles["section-subheader"]}>
          Danh sách thông tin cần thiết về các bãi đỗ xe của bạn
        </div>

        <div className={styles["table-wrapper"]}>
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
                        title="Chỉnh sửa"
                      >
                        <i className={styles["edit-icon"]}>✎</i>
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => handleDelete(lot.id)}
                        title="Xóa"
                      >
                        <i className={styles["edit-icon"]}>🗑</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles["pagination-wrapper"]}>
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
                className={`${styles["page-btn"]} ${
                  currentPage === page ? styles["active"] : ""
                }`}
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
        </div>

        {showForm && (
          <div className={styles["form-overlay"]}>
            <ParkingForm
              onClose={handleCloseForm}
              id={parkingLots.length + 1}
            />
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
