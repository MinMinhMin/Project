import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/user/History.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const token = localStorage.getItem("token");
const backendUrl = import.meta.env.VITE_API_URL;

const id = localStorage.getItem("ParkingLotId");
const History = () => {
  const not_use_here = "Thừa";

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [ticket_id, setTicketId] = useState();
  const [ticket_type, setTicketType] = useState();
  const [vehicle_type, setVehicleType] = useState();
  const [plateNumber, setPlateNumber] = useState("");
  const [status, setStatus] = useState();

  const [NumberCar, setNumberCar] = useState(0);
  const [NumberMotor, setNumberMotor] = useState(0);
  const [in_picture_plate, setInPicturePlate] = useState();
  const [in_picture_Face, setInPictureFace] = useState();
  const [out_picture_plate, setOutPicturePlate] = useState();
  const [out_picture_Face, setOutPictureFace] = useState();

  const [historyData, setHistoryData] = useState([]);

  const recordClick = (id) => {
    setInPictureFace(historyData[id].anhMatVao);
    setOutPictureFace(historyData[id].anhMatRa);
    setInPicturePlate(historyData[id].anhBienSoVao);
    setOutPicturePlate(historyData[id].anhBienSoRa);
  };

  async function fetchHistoryData(isGetVehicleNumber) {
    const params = {};
    if (status !== "Tất cả" && status) {
      params.status = status;
    }
    if (ticket_id) {
      params.ticket_id = ticket_id;
    }
    if (vehicle_type !== "Tất cả" && vehicle_type) {
      params.vehicle_type = vehicle_type;
    }
    if (ticket_type) {
      params.ticket_type = ticket_type;
    }
    if (dateFrom) {
      params.date_from = dateFrom;
    }
    if (dateTo) {
      params.date_to = dateTo;
    }
    if (plateNumber) {
      params.license_plate = plateNumber;
    }
    if (id) {
      params.parking_lot_id = id;
    }
    console.log("API Params:", params);
    try {
      const res = await axios.get(`${backendUrl}/history/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      });
      console.log("API Response:", res.data);

      const transformedData = res.data.map((record) => ({
        maThe: record.ticket_id,
        bienSo: record.license_plate_IN,
        thoiGianRa:
          record.date_out && record.time_out
            ? `${record.date_out} ${record.time_out}`
            : "Chưa có thông tin",
        thoiGianVao: `${record.date_in} ${record.time_in}`,
        loaiXe: record.vehicle_type,
        anhMatVao: record.face_image_path_IN,
        anhMatRa: record.face_image_path_OUT,
        anhBienSoVao: record.license_plate_image_path_IN,
        anhBienSoRa: record.license_plate_image_path_OUT,
      }));

      if (isGetVehicleNumber) {
        const cars = res.data.filter(
          (record) => record.vehicle_type === "Ô tô" && !record.date_out
        );
        const motorcycles = res.data.filter(
          (record) => record.vehicle_type === "Xe máy" && !record.date_out
        );

        setNumberCar(cars.length);
        setNumberMotor(motorcycles.length);

        console.log("Number of cars:", cars.length);
        console.log("Number of motorcycles:", motorcycles.length);
      }

      setHistoryData(transformedData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchHistoryData(true);
  }, [token]);

  const searchHandle = async () => {
    fetchHistoryData(false);
  };

  // State quản lý mở/đóng dropdown
  const [dropdownInOpen, setDropdownInOpen] = useState(false);
  const [dropdownTicketOpen, setDropdownTicketOpen] = useState(false);
  const [dropdownVehiclesOpen, setDropdownVehiclesOpen] = useState(false);
  const [dropdownStatusOpen, setDropdownStatusOpen] = useState(false);
  // status hiện tại được chọn

  // State quản lý xoay icon
  const [rotateIn, setRotateIn] = useState(0);
  const [rotateTicket, setRotateTicket] = useState(0);
  const [rotateVehiclesType, setRotateVehicles] = useState(0);
  const [rotateStatus, setRotateStatus] = useState(0);

  // Danh sách ID
  const idList_Status = ["Tất cả", "Trạng thái 1", "Trạng thái 2"];
  const idList_typeTicket = ["Vé lượt"];
  const idList_typeVehicles = ["Tất cả", "Xe máy", "Ô tô"];

  /**
   * Toggle từng dropdown riêng lẻ, đóng các dropdown còn lại
   */
  const toggleDropdownStatus = () => {
    setDropdownStatusOpen(!dropdownStatusOpen);
    setDropdownInOpen(false);
    setDropdownTicketOpen(false);
    setDropdownVehiclesOpen(false);

    setRotateIn(0);
    setRotateTicket(0);
    setRotateVehicles(0);
    setRotateStatus(dropdownStatusOpen ? 0 : 180);
  };

  const toggleDropdownVehicles = () => {
    setDropdownVehiclesOpen(!dropdownVehiclesOpen);
    setDropdownInOpen(false);
    setDropdownTicketOpen(false);

    setRotateIn(0);
    setRotateTicket(0);
    setRotateVehicles(dropdownVehiclesOpen ? 0 : 180);
  };

  const toggleDropdownIn = () => {
    setDropdownInOpen(!dropdownInOpen);
    setDropdownVehiclesOpen(false);
    setDropdownTicketOpen(false);

    setRotateVehicles(0);
    setRotateTicket(0);
    setRotateIn(dropdownInOpen ? 0 : 180);
  };

  const toggleDropdownTicket = () => {
    setDropdownTicketOpen(!dropdownTicketOpen);
    setDropdownInOpen(false);
    setDropdownVehiclesOpen(false);

    setRotateIn(0);
    setRotateVehicles(0);
    setRotateTicket(dropdownTicketOpen ? 0 : 180);
  };

  /**
   * Hàm chọn ID trong dropdown, đóng tất cả dropdown khác
   */
  const selectStatus = (id) => {
    console.log("Selected status ID:", id);
    setDropdownStatusOpen(false);
    setDropdownInOpen(false);
    setDropdownTicketOpen(false);
    setDropdownVehiclesOpen(false);

    setStatus(id);

    setRotateVehicles(0);
    setRotateIn(0);
    setRotateTicket(0);
    setRotateStatus(0);
  };

  const selectTicketType = (id) => {
    console.log("Selected in ID:", id);
    setDropdownInOpen(false);
    setDropdownTicketOpen(false);
    setDropdownVehiclesOpen(false);

    setTicketType(id);

    setRotateVehicles(0);
    setRotateIn(0);
    setRotateTicket(0);
  };

  const selectVehicleType = (id) => {
    console.log("Selected in ID:", id);
    setDropdownInOpen(false);
    setDropdownTicketOpen(false);
    setDropdownVehiclesOpen(false);

    setVehicleType(id);

    setRotateVehicles(0);
    setRotateIn(0);
    setRotateTicket(0);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.QuerryandlistHistory}>
        <div className={styles.Querry}>
          <div className={styles.Querrylist}>
            {/* Chọn đối trạng thái
            <div className={styles.ChosseQuerry}>
              <span className={styles.titleQuerry}>Trạng thái:</span>
              <button
                className={styles.idQuerry}
                onClick={toggleDropdownStatus}
              >
                <span className={styles.text}>{status || "*Chọn*"}</span>

                <img
                  src="/assets/DropDown2.svg"
                  alt="dropdown"
                  style={{
                    transform: `rotate(${rotateStatus}deg)`,
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
              {dropdownStatusOpen && (
                <ul className={styles.dropdownListStatus}>
                  {idList_Status.map((id) => (
                    <li
                      key={id}
                      className={`${styles.dropdownItemStatus} ${styles.text}`}
                      onClick={() => selectStatus(id)}
                    >
                      {id}
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
            {/*Chọn loại vé và loại xe */}
            <div className={styles.Vehicles_Ticket}>
              <span className={styles.titleQuerry}>Loại vé:</span>
              <button
                className={styles.TicketType}
                onClick={toggleDropdownTicket}
              >
                <span className={styles.text}>{ticket_type || "*Chọn*"}</span>
                <img
                  src="/assets/DropDown2.svg"
                  alt="dropdown"
                  style={{
                    transform: `rotate(${rotateTicket}deg)`,
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
              {dropdownTicketOpen && (
                <ul className={styles.ListTicket}>
                  {idList_typeTicket.map((id) => (
                    <li
                      key={id}
                      className={`${styles.ItemTicket} ${styles.text}`}
                      onClick={() => selectTicketType(id)}
                    >
                      {id}
                    </li>
                  ))}
                </ul>
              )}

              <span className={styles.titleQuerry}>Loại xe:</span>
              <button
                className={styles.VehiclesType}
                onClick={toggleDropdownVehicles}
              >
                <span className={styles.text}>{vehicle_type || "*Chọn*"}</span>
                <img
                  src="/assets/DropDown2.svg"
                  alt="dropdown"
                  style={{
                    transform: `rotate(${rotateVehiclesType}deg)`,
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>
              {dropdownVehiclesOpen && (
                <ul className={styles.ListVehicles}>
                  {idList_typeVehicles.map((id) => (
                    <li
                      key={id}
                      className={`${styles.ItemTicket} ${styles.text}`}
                      onClick={() => selectVehicleType(id)}
                    >
                      {id}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/*Chọn ngày */}
            <div className={styles.DateContainer}>
              <div className={styles.DatePickerGroup}>
                <span className={styles.titleQuerry}>Từ ngày:</span>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className={styles.customInput}
                  placeholderText="Chọn ngày"
                  calendarClassName={styles.customCalendar}
                  popperPlacement="bottom-start"
                />
              </div>

              <div className={`${styles.DatePickerGroup} ${styles.c1}`}>
                <span className={styles.titleQuerry}>Đến:</span>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className={styles.customInput}
                  placeholderText="Chọn ngày"
                  calendarClassName={styles.customCalendar}
                  popperPlacement="bottom-start"
                  minDate={fromDate} // Không cho chọn ngày trước "Từ ngày"
                />
              </div>
            </div>
            {/*Điền biển số và điền Mã thẻ */}
            <div className={styles.Plate_Card}>
              <span className={styles.titleQuerry}>Biển số:</span>
              <input
                placeholder="Nhập biển số xe"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                className={styles.Plate}
              />

              <span className={styles.titleQuerry}>Mã thẻ:</span>
              <input
                placeholder="Nhập mã số thẻ"
                value={ticket_id}
                onChange={(e) => setTicketId(e.target.value)}
                className={styles.Card}
              />
            </div>
          </div>
          {/*Nút tìm kiếm */}
          <div className={styles.SearchContainer}>
            <button className={styles.Search} onClick={searchHandle}>
              <span className={styles.text}>Tìm kiếm</span>
            </button>
          </div>
        </div>
        {/*Danh sách truy vấn */}
        <div className={styles.listHistory}>
          <table className={styles.TableHistory}>
            <thead>
              <tr>
                <th>Mã thẻ</th>
                <th>Biển số</th>
                <th>Thời gian vào</th>
                <th>Thời gian ra</th>
                <th>Loại xe</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((record, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? styles.odd : styles.even}
                  onClick={() => recordClick(index)}
                >
                  <td>{record.maThe}</td>
                  <td>{record.bienSo}</td>
                  <td>{record.thoiGianVao}</td>
                  <td>{record.thoiGianRa}</td>
                  <td>{record.loaiXe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.screenContainer}>
        <div className={styles.CarandMotor}>
          <div className={styles.Car}>
            <div className={styles.Cartext}>
              <span className={styles.text1}>Ô tô</span>
              <img src="/assets/Car.svg" alt="Car" />
            </div>
            <div className={styles.CarNumber}>
              <span className={styles.NumberVehicles}>{NumberCar}</span>
            </div>
          </div>
          <div className={styles.Car}>
            <div className={styles.Cartext}>
              <span className={styles.text1}>Xe máy</span>
              <img src="/assets/Motor.png" alt="Motor" />
            </div>
            <div className={styles.CarNumber}>
              <span className={styles.NumberVehicles}>{NumberMotor}</span>
            </div>
          </div>
        </div>
        <div className={styles.ScreenHistory}>
          <div className={styles.Screen1}>
            <div className={styles.ImageContainer}>
              {in_picture_plate ? (
                <img src={in_picture_plate} alt="Biển số" />
              ) : (
                <span className={styles.text} style={{ display: "block" }}>
                  Không có hình ảnh biển số
                </span>
              )}
            </div>
            <div className={styles.ImageIN}>
              <span className={styles.text} style={{ color: "white" }}>
                Hình ảnh vào
              </span>
            </div>
          </div>
          <div className={styles.Screen2}>
            <div className={styles.ImageContainer}>
              {in_picture_Face ? (
                <img src={in_picture_Face} alt="Gương mặt" />
              ) : (
                <span className={styles.text} style={{ display: "block" }}>
                  Không có hình ảnh gương mặt
                </span>
              )}
            </div>
          </div>
          <div className={styles.Screen3}>
            <div className={styles.ImageContainer}>
              {out_picture_plate ? (
                <img src={out_picture_plate} alt="Biển số" />
              ) : (
                <span className={styles.text} style={{ display: "block" }}>
                  Không có hình ảnh biển số
                </span>
              )}
            </div>
            <div className={styles.ImageOUT}>
              <span className={styles.text} style={{ color: "white" }}>
                Hình ảnh ra
              </span>
            </div>
          </div>
          <div className={styles.Screen4}>
            <div className={styles.ImageContainer}>
              {out_picture_Face ? (
                <img src={out_picture_Face} alt="Gương mặt" />
              ) : (
                <span className={styles.text} style={{ display: "block" }}>
                  Không có hình ảnh gương mặt
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
