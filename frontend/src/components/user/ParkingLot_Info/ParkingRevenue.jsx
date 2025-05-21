import { useState } from "react";
import styles from "../../../styles/ParkingRevenue.module.css";

export default function ParkingRevenue() {
  const [startDate, setStartDate] = useState("25/05/2025");
  const [endDate, setEndDate] = useState("26/05/2025");
  const [location, setLocation] = useState("VNU-UEB");
  const [vehicleType, setVehicleType] = useState("Tất cả");

  const [data, setData] = useState({
    motorcycles: {
      sent: 600,
      received: 200,
      price: 200,
      revenue: 120000,
    },
    cars: {
      sent: 600,
      received: 500,
      price: 200,
      revenue: 100000,
    },
  });

  const totalRevenue = data.motorcycles.revenue + data.cars.revenue;

  return (
    <div className={styles["parking-container"]}>
      {/* Phía dưới menu bar */}
      <div className={styles["filter-section"]}>
        <div className={styles["filter-item"]}>
          <span className={styles["filter-label"]}>Chọn ngày:</span>
          <input
            type="text"
            className={styles["text-input"]}
            placeholder="dd/mm/yyyy"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className={styles["filter-item"]}>
          <span className={styles["filter-label"]}>Đến:</span>
          <input
            type="text"
            className={styles["text-input"]}
            placeholder="dd/mm/yyyy"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className={styles["filter-item"]}>
          <span className={styles["filter-label"]}>Bãi đỗ:</span>
          <select
            className={styles["select-input"]}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="VNU-UEB">VNU-UEB</option>
          </select>
        </div>

        

        <button className={styles["query-button"]}>Truy vấn</button>
      </div>

      <div className={styles["content-section"]}>
        <div className={styles["stats-container"]}>
          <h3 className={styles["stats-title"]}>Thống kê doanh thu</h3>
          <div className={styles["stats-grid"]}>
            <div className={`${styles["stats-card"]} ${styles["motorcycle"]}`}>
              <h4 className={`${styles["card-title"]} ${styles["motorcycle-title"]}`}>
                Doanh thu xe máy
              </h4>
              <div className={styles["stats-row"]}>
                <span>Số lượng gửi:</span>
                <span>{data.motorcycles.sent}</span>
              </div>
              <div className={styles["stats-row"]}>
                <span>Số lượng đã lấy:</span>
                <span>{data.motorcycles.received}</span>
              </div>
              <div className={styles["stats-row"]}>
                <span>Giá vé:</span>
                <span>{data.motorcycles.price} VNĐ</span>
              </div>
              <div className={`${styles["stats-row"]} ${styles["revenue"]} ${styles["motorcycle-revenue"]}`}>
                <span>Doanh thu:</span>
                <span>{data.motorcycles.revenue.toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className={`${styles["stats-card"]} ${styles["car"]}`}>
              <h4 className={`${styles["card-title"]} ${styles["car-title"]}`}>
                Doanh thu ô tô
              </h4>
              <div className={styles["stats-row"]}>
                <span>Số lượng gửi:</span>
                <span>{data.cars.sent}</span>
              </div>
              <div className={styles["stats-row"]}>
                <span>Số lượng đã lấy:</span>
                <span>{data.cars.received}</span>
              </div>
              <div className={styles["stats-row"]}>
                <span>Giá vé:</span>
                <span>{data.cars.price} VNĐ</span>
              </div>
              <div className={`${styles["stats-row"]} ${styles["revenue"]} ${styles["car-revenue"]}`}>
                <span>Doanh thu:</span>
                <span>{data.cars.revenue.toLocaleString()} VNĐ</span>
              </div>
            </div>
          </div>

          <div className={styles["total-revenue"]}>
            <div className={`${styles["stats-row"]} ${styles["total"]}`}>
              <span>Tổng doanh thu:</span>
              <span className={styles["total-amount"]}>
                {totalRevenue.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        </div>

        <table className={styles["data-table"]}>
          <thead>
            <tr>
              <th>Số lượng xe máy gửi</th>
              <th>Số lượng xe ô tô gửi</th>
              <th>Số xe máy đã lấy</th>
              <th>Số xe ô tô đã lấy</th>
              <th>Giá vé xe máy</th>
              <th>Giá vé xe ô tô</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.motorcycles.sent}</td>
              <td>{data.cars.sent}</td>
              <td>{data.motorcycles.received}</td>
              <td>{data.cars.received}</td>
              <td>{data.motorcycles.price}</td>
              <td>{data.cars.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
