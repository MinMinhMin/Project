import { useState, useEffect } from "react";
import { Calendar, Car, Bike, DollarSign, Users, Clock } from "lucide-react";
import styles from "../../../styles/ParkingRevenue.module.css";
import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function ParkingRevenue() {
  const [parkingLots, setParkingLots] = useState([]);
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isMotorcyclePriceEditable, setIsMotorcyclePriceEditable] =
    useState(false);
  const [isCarPriceEditable, setIsCarPriceEditable] = useState(false);
  const [motorcyclePriceInput, setMotorcyclePriceInput] = useState(10000);
  const [carPriceInput, setCarPriceInput] = useState(30000);
  const [numBikes, setNumBikes] = useState(0);
  const [numCars, setNumCars] = useState(0);
  const [totalVehiclesTaken, setTotalVehiclesTaken] = useState(0);

  const [data, setData] = useState({
    motorcycles: {
      sent: 0,
      received: 0,
      price: 200,
      revenue: 0,
    },
    cars: {
      sent: 0,
      received: 0,
      price: 200,
      revenue: 0,
    },
  });

  async function fetchParkingLots() {
    try {
      const res = await axios.get(`${backendUrl}/parking_lot/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", res.data);
      const transformedData = res.data.map((lot) => ({
        id: lot.id,
        name: lot.name ?? "Chưa có tên",
      }));
      setParkingLots(transformedData);
      if (transformedData.length > 0) {
        setLocation(transformedData[0].name);
        setLocationId(transformedData[0].id);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  async function fetchHistory() {
    const params = {};
    try {
      if (startDate) {
        params.date_from = startDate;
      }
      if (endDate) {
        params.date_to = endDate;
      }
      if (locationId) {
        params.parking_lot_id = locationId;
      }

      const res = await axios.get(`${backendUrl}/history/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });
      console.log("History API Response:", res.data);

      const bikes = res.data.filter((item) => item.vehicle_type === "Xe máy");
      const cars = res.data.filter((item) => item.vehicle_type === "Ô tô");
      const vehiclesNotTaken = res.data.filter((item) => !item.date_out);
      const vehiclesTaken = res.data.filter((item) => item.date_out);

      const numBikesTaken = vehiclesTaken.filter(
        (item) => item.vehicle_type === "Xe máy"
      ).length;
      const numCarsTaken = vehiclesTaken.filter(
        (item) => item.vehicle_type === "Ô tô"
      ).length;

      setNumBikes(bikes.length);
      setNumCars(cars.length);
      setTotalVehiclesTaken(vehiclesNotTaken.length);

      setData({
        motorcycles: {
          sent: bikes.length,
          received: numBikesTaken,
          price: parseFloat(motorcyclePriceInput) || 200,
          revenue: numBikesTaken * (parseFloat(motorcyclePriceInput) || 200),
        },
        cars: {
          sent: cars.length,
          received: numCarsTaken,
          price: parseFloat(carPriceInput) || 200,
          revenue: numCarsTaken * (parseFloat(carPriceInput) || 200),
        },
      });
    } catch (err) {
      console.error("History API Error:", err);
    }
  }

  useEffect(() => {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    fetchParkingLots();
  }, [token]);

  useEffect(() => {
    // Update prices in data state when input changes
    setData((prev) => ({
      ...prev,
      motorcycles: {
        ...prev.motorcycles,
        price: parseFloat(motorcyclePriceInput) || 200,
        revenue:
          prev.motorcycles.received * (parseFloat(motorcyclePriceInput) || 200),
      },
      cars: {
        ...prev.cars,
        price: parseFloat(carPriceInput) || 200,
        revenue: prev.cars.received * (parseFloat(carPriceInput) || 200),
      },
    }));
  }, [motorcyclePriceInput, carPriceInput]);

  const totalRevenue = data.motorcycles.revenue + data.cars.revenue;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleQuery = async () => {
    if (locationId) {
      await fetchHistory();
      console.log("Number of bikes:", numBikes);
      console.log("Number of cars:", numCars);
      console.log("Total vehicles not checked out:", totalVehiclesTaken);
    }
    console.log("Querying data from", startDate, "to", endDate, "at", location);
    console.log("Location ID:", locationId);
  };

  const handleMotorcyclePriceToggle = () => {
    if (isMotorcyclePriceEditable) {
      const newPrice = parseFloat(motorcyclePriceInput);
      if (!isNaN(newPrice) && newPrice >= 0) {
        setData((prev) => ({
          ...prev,
          motorcycles: {
            ...prev.motorcycles,
            price: newPrice,
            revenue: prev.motorcycles.received * newPrice,
          },
        }));
      }
    }
    setIsMotorcyclePriceEditable(!isMotorcyclePriceEditable);
  };

  const handleCarPriceToggle = () => {
    if (isCarPriceEditable) {
      const newPrice = parseFloat(carPriceInput);
      if (!isNaN(newPrice) && newPrice >= 0) {
        setData((prev) => ({
          ...prev,
          cars: {
            ...prev.cars,
            price: newPrice,
            revenue: prev.cars.received * newPrice,
          },
        }));
      }
    }
    setIsCarPriceEditable(!isCarPriceEditable);
  };

  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Thống kê doanh thu bãi đỗ xe</h1>
          <p className={styles.subtitle}>
            Quản lý và theo dõi doanh thu hệ thống đỗ xe thông minh
          </p>
        </div>

        {/* Filter Section */}
        <div className={styles.filterSection}>
          <div className={styles.filterGrid}>
            <div className={styles.filterItem}>
              <label className={styles.label}>
                <Calendar
                  style={{
                    display: "inline",
                    width: "16px",
                    height: "16px",
                    marginRight: "4px",
                  }}
                />
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
                <Calendar
                  style={{
                    display: "inline",
                    width: "16px",
                    height: "16px",
                    marginRight: "4px",
                  }}
                />
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
                onChange={(e) => {
                  const selectedName = e.target.value;
                  setLocation(selectedName);
                  const selectedLot = parkingLots.find(
                    (lot) => lot.name === selectedName
                  );
                  if (selectedLot) {
                    setLocationId(selectedLot.id);
                    console.log("Selected Location ID:", selectedLot.id);
                  } else {
                    setLocationId(null);
                    console.log(
                      "No matching lot found for name:",
                      selectedName
                    );
                  }
                }}
              >
                {parkingLots.length === 0 ? (
                  <option value="">Đang tải...</option>
                ) : (
                  parkingLots.map((lot) => (
                    <option key={lot.id} value={lot.name}>
                      {lot.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>
                <Bike
                  style={{
                    display: "inline",
                    width: "16px",
                    height: "16px",
                    marginRight: "4px",
                  }}
                />
                Giá vé xe máy
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="number"
                  className={styles.input}
                  value={motorcyclePriceInput}
                  onChange={(e) => setMotorcyclePriceInput(e.target.value)}
                  disabled={!isMotorcyclePriceEditable}
                  onFocus={(e) => e.target.classList.add(styles.inputFocus)}
                  onBlur={(e) => e.target.classList.remove(styles.inputFocus)}
                />
                <button
                  onClick={handleMotorcyclePriceToggle}
                  className={styles.button}
                  onMouseOver={(e) =>
                    e.target.classList.add(styles.buttonHover)
                  }
                  onMouseOut={(e) =>
                    e.target.classList.remove(styles.buttonHover)
                  }
                >
                  {isMotorcyclePriceEditable ? "Lưu" : "Sửa"}
                </button>
              </div>
            </div>

            <div className={styles.filterItem}>
              <label className={styles.label}>
                <Car
                  style={{
                    display: "inline",
                    width: "16px",
                    height: "16px",
                    marginRight: "4px",
                  }}
                />
                Giá vé ô tô
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input
                  type="number"
                  className={styles.input}
                  value={carPriceInput}
                  onChange={(e) => setCarPriceInput(e.target.value)}
                  disabled={!isCarPriceEditable}
                  onFocus={(e) => e.target.classList.add(styles.inputFocus)}
                  onBlur={(e) => e.target.classList.remove(styles.inputFocus)}
                />
                <button
                  onClick={handleCarPriceToggle}
                  className={styles.button}
                  onMouseOver={(e) =>
                    e.target.classList.add(styles.buttonHover)
                  }
                  onMouseOut={(e) =>
                    e.target.classList.remove(styles.buttonHover)
                  }
                >
                  {isCarPriceEditable ? "Lưu" : "Sửa"}
                </button>
              </div>
            </div>

            <div className={styles.filterItem}>
              <button
                onClick={handleQuery}
                className={styles.button}
                onMouseOver={(e) => e.target.classList.add(styles.buttonHover)}
                onMouseOut={(e) =>
                  e.target.classList.remove(styles.buttonHover)
                }
              >
                <Clock
                  style={{ width: "16px", height: "16px", marginRight: "8px" }}
                />
                Truy vấn
              </button>
            </div>
          </div>

          <div className={styles.dateInfo}>
            Thời gian: {startDate ? formatDate(startDate) : "Tất cả"} -{" "}
            {endDate ? formatDate(endDate) : "Tất cả"} | Địa điểm:{" "}
            {location || "Tất cả"}
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.iconOrange}`}>
                <Bike style={{ width: "24px", height: "24px" }} />
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
                <Car style={{ width: "24px", height: "24px" }} />
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
                <Users style={{ width: "24px", height: "24px" }} />
              </div>
              <div>
                <p className={styles.statText}>Tổng xe đã lấy</p>
                <p className={styles.statNumber}>
                  {data.motorcycles.received + data.cars.received}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardContent}>
              <div className={`${styles.iconContainer} ${styles.iconPurple}`}>
                <DollarSign style={{ width: "24px", height: "24px" }} />
              </div>
              <div>
                <p className={styles.statText}>Tổng doanh thu</p>
                <p className={styles.statNumberGreen}>
                  {totalRevenue.toLocaleString()} VNĐ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Details */}
        <div className={styles.revenueGrid}>
          {/* Motorcycle Revenue */}
          <div className={styles.revenueCard}>
            <div className={styles.cardHeader}>
              <Bike
                style={{ width: "20px", height: "20px", color: "#ea580c" }}
              />
              <h3 className={styles.cardTitle}>Doanh thu xe máy</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardRowsContainer}>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Số lượng gửi:</span>
                  <span className={styles.cardRowValue}>
                    {data.motorcycles.sent}
                  </span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Số lượng đã lấy:</span>
                  <span className={styles.cardRowValue}>
                    {data.motorcycles.received}
                  </span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Giá vé:</span>
                  <span className={styles.cardRowValue}>
                    {data.motorcycles.price.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className={`${styles.cardRow} ${styles.cardRowTotal}`}>
                  <span className={styles.cardRowTotalLabel}>Doanh thu:</span>
                  <span className={styles.cardRowTotalValueOrange}>
                    {data.motorcycles.revenue.toLocaleString()} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Car Revenue */}
          <div className={styles.revenueCard}>
            <div className={styles.cardHeader}>
              <Car
                style={{ width: "20px", height: "20px", color: "#2563eb" }}
              />
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
                  <span className={styles.cardRowValue}>
                    {data.cars.received}
                  </span>
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardRowLabel}>Giá vé:</span>
                  <span className={styles.cardRowValue}>
                    {data.cars.price.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className={`${styles.cardRow} ${styles.cardRowTotal}`}>
                  <span className={styles.cardRowTotalLabel}>Doanh thu:</span>
                  <span className={styles.cardRowTotalValueBlue}>
                    {data.cars.revenue.toLocaleString()} VNĐ
                  </span>
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
                    <Bike
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#ea580c",
                        marginRight: "8px",
                      }}
                    />
                    <span className={styles.tdBold}>Xe máy</span>
                  </td>
                  <td className={styles.td}>{data.motorcycles.sent}</td>
                  <td className={styles.td}>{data.motorcycles.received}</td>
                  <td className={styles.td}>
                    {data.motorcycles.price.toLocaleString()}
                  </td>
                  <td className={styles.tdOrange}>
                    {data.motorcycles.revenue.toLocaleString()}
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeOrange}`}>
                      {data.motorcycles.sent > 0
                        ? Math.round(
                            (data.motorcycles.received /
                              data.motorcycles.sent) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tdWithIcon}>
                    <Car
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#2563eb",
                        marginRight: "8px",
                      }}
                    />
                    <span className={styles.tdBold}>Ô tô</span>
                  </td>
                  <td className={styles.td}>{data.cars.sent}</td>
                  <td className={styles.td}>{data.cars.received}</td>
                  <td className={styles.td}>
                    {data.cars.price.toLocaleString()}
                  </td>
                  <td className={styles.tdBlue}>
                    {data.cars.revenue.toLocaleString()}
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeBlue}`}>
                      {data.cars.sent > 0
                        ? Math.round(
                            (data.cars.received / data.cars.sent) * 100
                          )
                        : 0}
                      %
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot className={styles.tfootBg}>
                <tr>
                  <td className={styles.tfootBold}>Tổng cộng</td>
                  <td className={styles.tfootBold}>
                    {data.motorcycles.sent + data.cars.sent}
                  </td>
                  <td className={styles.tfootBold}>
                    {data.motorcycles.received + data.cars.received}
                  </td>
                  <td className={styles.td}>-</td>
                  <td className={styles.tfootGreen}>
                    {totalRevenue.toLocaleString()}
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>
                      {data.motorcycles.sent + data.cars.sent > 0
                        ? Math.round(
                            ((data.motorcycles.received + data.cars.received) /
                              (data.motorcycles.sent + data.cars.sent)) *
                              100
                          )
                        : 0}
                      %
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
