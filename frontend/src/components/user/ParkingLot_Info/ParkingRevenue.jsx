import { useState } from "react";
import { Calendar, Car, Bike, DollarSign, Users, Clock } from "lucide-react";
import styles from "../../../styles/ParkingRevenue.module.css";

export default function ParkingRevenue() {
  const [startDate, setStartDate] = useState("2025-05-25");
  const [endDate, setEndDate] = useState("2025-05-26");
  const [location, setLocation] = useState("VNU-UEB");

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleQuery = () => {
    console.log("Querying data from", startDate, "to", endDate, "at", location);
  };

  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Thống kê doanh thu bãi đỗ xe</h1>
          <p className={styles.subtitle}>Quản lý và theo dõi doanh thu hệ thống đỗ xe thông minh</p>
        </div>

        {/* Filter Section */}
        <div className={styles.filterSection}>
          <div className={styles.filterGrid}>
            <div className={styles.filterItem}>
              <label className={styles.label}>
                <Calendar style={{display: 'inline', width: '16px', height: '16px', marginRight: '4px'}} />
                Từ ngày
              </label>
              <input
                type="date"
                className={styles.input}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onFocus={(e) => e.target.classList.add(styles.inputFocus)}
                onBlur={(e) => e.target.classList.remove(styles.inputFocus)}
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>
                <Calendar style={{display: 'inline', width: '16px', height: '16px', marginRight: '4px'}} />
                Đến ngày
              </label>
              <input
                type="date"
                className={styles.input}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onFocus={(e) => e.target.classList.add(styles.inputFocus)}
                onBlur={(e) => e.target.classList.remove(styles.inputFocus)}
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>Bãi đỗ xe</label>
              <select
                className={styles.select}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="VNU-UEB">VNU-UEB</option>
                <option value="VNU-HUS">VNU-HUS</option>
                <option value="VNU-UET">VNU-UET</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <button
                onClick={handleQuery}
                className={styles.button}
                onMouseOver={(e) => e.target.classList.add(styles.buttonHover)}
                onMouseOut={(e) => e.target.classList.remove(styles.buttonHover)}
              >
                <Clock style={{width: '16px', height: '16px', marginRight: '8px'}} />
                Truy vấn
              </button>
            </div>
          </div>

          <div className={styles.dateInfo}>
            Thời gian: {formatDate(startDate)} - {formatDate(endDate)} | Địa điểm: {location}
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.iconOrange}`}>
                <Bike style={{width: '24px', height: '24px'}} />
              </div>
              <div>
                <p className={styles.statText}>Xe máy gửi</p>
                <p className={styles.statNumber}>{data.motorcycles.sent}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.iconBlue}`}>
                <Car style={{width: '24px', height: '24px'}} />
              </div>
              <div>
                <p className={styles.statText}>Ô tô gửi</p>
                <p className={styles.statNumber}>{data.cars.sent}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.iconGreen}`}>
                <Users style={{width: '24px', height: '24px'}} />
              </div>
              <div>
                <p className={styles.statText}>Tổng xe đã lấy</p>
                <p className={styles.statNumber}>{data.motorcycles.received + data.cars.received}</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.iconPurple}`}>
                <DollarSign style={{width: '24px', height: '24px'}} />
              </div>
              <div>
                <p className={styles.statText}>Tổng doanh thu</p>
                <p className={styles.statNumberGreen}>{totalRevenue.toLocaleString()} VNĐ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Details */}
        <div className={styles.revenueGrid}>
          {/* Motorcycle Revenue */}
          <div className={styles.revenueCard}>
            <div className={styles.cardHeader}>
              <Bike style={{width: '20px', height: '20px', color: '#ea580c'}} />
              <h3 className={styles.cardTitle}>Doanh thu xe máy</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardRowsContainer}>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Số lượng gửi:</span>
                  <span className={styles.cardRowValue}>{data.motorcycles.sent}</span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Số lượng đã lấy:</span>
                  <span className={styles.cardRowValue}>{data.motorcycles.received}</span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Giá vé:</span>
                  <span className={styles.cardRowValue}>{data.motorcycles.price.toLocaleString()} VNĐ</span>
                </div>
                <div className={`${styles.cardRow} ${styles.cardRowTotal}`}>
                  <span className={styles.cardRowTotalLabel}>Doanh thu:</span>
                  <span className={styles.cardRowTotalValueOrange}>{data.motorcycles.revenue.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Car Revenue */}
          <div className={styles.revenueCard}>
            <div className={styles.cardHeader}>
              <Car style={{width: '20px', height: '20px', color: '#2563eb'}} />
              <h3 className={styles.cardTitle}>Doanh thu ô tô</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardRowsContainer}>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Số lượng gửi:</span>
                  <span className={styles.cardRowValue}>{data.cars.sent}</span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Số lượng đã lấy:</span>
                  <span className={styles.cardRowValue}>{data.cars.received}</span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Giá vé:</span>
                  <span className={styles.cardRowValue}>{data.cars.price.toLocaleString()} VNĐ</span>
                </div>
                <div className={`${styles.cardRow} ${styles.cardRowTotal}`}>
                  <span className={styles.cardRowTotalLabel}>Doanh thu:</span>
                  <span className={styles.cardRowTotalValueBlue}>{data.cars.revenue.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <h3 className={styles.tableTitle}>Bảng tổng hợp chi tiết</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Loại xe</th>
                  <th className={styles.th}>Số lượng gửi</th>
                  <th className={styles.th}>Số lượng đã lấy</th>
                  <th className={styles.th}>Giá vé (VNĐ)</th>
                  <th className={styles.th}>Doanh thu (VNĐ)</th>
                  <th className={styles.th}>Tỷ lệ lấy xe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tdWithIcon}>
                    <Bike style={{width: '20px', height: '20px', color: '#ea580c', marginRight: '8px'}} />
                    <span className={styles.tdBold}>Xe máy</span>
                  </td>
                  <td className={styles.td}>{data.motorcycles.sent}</td>
                  <td className={styles.td}>{data.motorcycles.received}</td>
                  <td className={styles.td}>{data.motorcycles.price.toLocaleString()}</td>
                  <td className={styles.tdOrange}>{data.motorcycles.revenue.toLocaleString()}</td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeOrange}`}>
                      {Math.round((data.motorcycles.received / data.motorcycles.sent) * 100)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdWithIcon}>
                    <Car style={{width: '20px', height: '20px', color: '#2563eb', marginRight: '8px'}} />
                    <span className={styles.tdBold}>Ô tô</span>
                  </td>
                  <td className={styles.td}>{data.cars.sent}</td>
                  <td className={styles.td}>{data.cars.received}</td>
                  <td className={styles.td}>{data.cars.price.toLocaleString()}</td>
                  <td className={styles.tdBlue}>{data.cars.revenue.toLocaleString()}</td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeBlue}`}>
                      {Math.round((data.cars.received / data.cars.sent) * 100)}%
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot className={styles.tfootBg}>
                <tr>
                  <td className={styles.tfootBold}>Tổng cộng</td>
                  <td className={styles.tfootBold}>{data.motorcycles.sent + data.cars.sent}</td>
                  <td className={styles.tfootBold}>{data.motorcycles.received + data.cars.received}</td>
                  <td className={styles.td}>-</td>
                  <td className={styles.tfootGreen}>{totalRevenue.toLocaleString()}</td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>
                      {Math.round(((data.motorcycles.received + data.cars.received) / (data.motorcycles.sent + data.cars.sent)) * 100)}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}