import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/user/querryHistory.module.css";

const MainScreen = ({
    in_id = "Tất cả các xe",
    in_Ticket = "Vé lượt",
    in_VehiclesType = "Tất cả",
    in_fromDate = "25/05/2025",
    in_toDate = "26/05/2025",
    NumberCar = 23,
    NumberMotor = 125,
    in_picture_plate,
    in_picture_Face,
    out_picture_plate,
    out_picture_Face
}) => {
const data = [
  {
    maThe: 'T001',
    bienSo: '29A-12345',
    thoiGianRa: '2025-05-19 08:30',
    thoiGianVao: '2025-05-19 07:00',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T002',
    bienSo: '30B-67890',
    thoiGianRa: '2025-05-19 12:15',
    thoiGianVao: '2025-05-19 10:00',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T003',
    bienSo: '51C-54321',
    thoiGianRa: '2025-05-19 15:45',
    thoiGianVao: '2025-05-19 13:30',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T004',
    bienSo: '18A-98765',
    thoiGianRa: '2025-05-19 17:20',
    thoiGianVao: '2025-05-19 16:00',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T005',
    bienSo: '99B-24680',
    thoiGianRa: '2025-05-19 19:10',
    thoiGianVao: '2025-05-19 18:00',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T006',
    bienSo: '36A-13579',
    thoiGianRa: '2025-05-19 21:00',
    thoiGianVao: '2025-05-19 20:15',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T007',
    bienSo: '43C-11223',
    thoiGianRa: '2025-05-19 23:30',
    thoiGianVao: '2025-05-19 22:00',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T008',
    bienSo: '29B-33445',
    thoiGianRa: '2025-05-19 09:00',
    thoiGianVao: '2025-05-19 08:00',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T009',
    bienSo: '50C-66778',
    thoiGianRa: '2025-05-19 11:30',
    thoiGianVao: '2025-05-19 10:45',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T010',
    bienSo: '15A-88990',
    thoiGianRa: '2025-05-19 14:20',
    thoiGianVao: '2025-05-19 13:00',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T011',
    bienSo: '80B-22334',
    thoiGianRa: '2025-05-19 16:50',
    thoiGianVao: '2025-05-19 15:30',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T012',
    bienSo: '34A-44556',
    thoiGianRa: '2025-05-19 18:40',
    thoiGianVao: '2025-05-19 17:20',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T007',
    bienSo: '43C-11223',
    thoiGianRa: '2025-05-19 23:30',
    thoiGianVao: '2025-05-19 22:00',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T008',
    bienSo: '29B-33445',
    thoiGianRa: '2025-05-19 09:00',
    thoiGianVao: '2025-05-19 08:00',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T009',
    bienSo: '50C-66778',
    thoiGianRa: '2025-05-19 11:30',
    thoiGianVao: '2025-05-19 10:45',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T010',
    bienSo: '15A-88990',
    thoiGianRa: '2025-05-19 14:20',
    thoiGianVao: '2025-05-19 13:00',
    loaiXe: 'Xe máy',
  },
  {
    maThe: 'T011',
    bienSo: '80B-22334',
    thoiGianRa: '2025-05-19 16:50',
    thoiGianVao: '2025-05-19 15:30',
    loaiXe: 'Ô tô',
  },
  {
    maThe: 'T012',
    bienSo: '34A-44556',
    thoiGianRa: '2025-05-19 18:40',
    thoiGianVao: '2025-05-19 17:20',
    loaiXe: 'Xe máy',
  },
];
const [plateNumber, setPlateNumber] = useState('');
const [CardNumber, setCardNumber] = useState('');

    // State quản lý mở/đóng dropdown
const [dropdownInOpen, setDropdownInOpen] = useState(false);
const [dropdownTicketOpen, setDropdownTicketOpen] = useState(false);
const [dropdownVehiclesOpen, setDropdownVehiclesOpen] = useState(false);
const [dropdownDateFromOpen, setDropdownDateFromOpen] = useState(false);
const [dropdownDateToOpen, setDropdownDateToOpen] = useState(false);

// State quản lý xoay icon
const [rotateIn, setRotateIn] = useState(0);
const [rotateTicket, setRotateTicket] = useState(0);
const [rotateVehiclesType, setRotateVehicles] = useState(0);
const [rotateDateFrom, setRotateDateFrom] = useState(0);
const [rotateDateTo, setRotateDateTo] = useState(0);

// Danh sách ID
const idList_Querry = ["Tất cả các xe", "Xe máy", "Ô tô"];
const idList_typeTicket = ["Vé lượt"];
const idList_typeVehicles = ["Tất cả", "Xe máy", "Ô tô"];
const idList_Date = [
  "25/05/2025", "26/05/2025", "27/05/2025", "28/05/2025",
  "29/05/2025", "30/05/2025", "31/05/2025", "01/06/2025",
  "02/06/2025", "03/06/2025", "04/06/2025", "05/06/2025",
  "06/06/2025", "07/06/2025", "08/06/2025", "09/06/2025",
  "10/06/2025"
];
/**
 * Toggle từng dropdown riêng lẻ, đóng các dropdown còn lại
 */
const toggleDropdownVehicles = () => {
  setDropdownVehiclesOpen(!dropdownVehiclesOpen);
  setDropdownInOpen(false);
  setDropdownTicketOpen(false);
  setDropdownDateFromOpen(false);
  setDropdownDateToOpen(false);

  setRotateIn(0);
  setRotateTicket(0);
  setRotateDateFrom(0);
  setRotateDateTo(0);
  setRotateVehicles(dropdownVehiclesOpen ? 0 : 180);
};

const toggleDropdownIn = () => {
  setDropdownInOpen(!dropdownInOpen);
  setDropdownVehiclesOpen(false);
  setDropdownTicketOpen(false);
  setDropdownDateFromOpen(false);
  setDropdownDateToOpen(false);

  setRotateVehicles(0);
  setRotateTicket(0);
  setRotateDateFrom(0);
  setRotateDateTo(0);
  setRotateIn(dropdownInOpen ? 0 : 180);
};

const toggleDropdownTicket = () => {
  setDropdownTicketOpen(!dropdownTicketOpen);
  setDropdownInOpen(false);
  setDropdownVehiclesOpen(false);
  setDropdownDateFromOpen(false);
  setDropdownDateToOpen(false);

  setRotateIn(0);
  setRotateVehicles(0);
  setRotateDateFrom(0);
  setRotateDateTo(0);
  setRotateTicket(dropdownTicketOpen ? 0 : 180);
};

const toggleDropdownDateFrom = () => {
  setDropdownDateFromOpen(!dropdownDateFromOpen);
  setDropdownInOpen(false);
  setDropdownVehiclesOpen(false);
  setDropdownTicketOpen(false);
  setDropdownDateToOpen(false);

  setRotateIn(0);
  setRotateVehicles(0);
  setRotateTicket(0);
  setRotateDateTo(0);
  setRotateDateFrom(dropdownDateFromOpen ? 0 : 180);
};

const toggleDropdownDateTo = () => {
  setDropdownDateToOpen(!dropdownDateToOpen);
  setDropdownInOpen(false);
  setDropdownVehiclesOpen(false);
  setDropdownTicketOpen(false);
  setDropdownDateFromOpen(false);

  setRotateIn(0);
  setRotateVehicles(0);
  setRotateTicket(0);
  setRotateDateFrom(0);
  setRotateDateTo(dropdownDateToOpen ? 0 : 180);
};

/**
 * Hàm chọn ID trong dropdown, đóng tất cả dropdown khác
 */
const selectInId = (id) => {
  console.log("Selected in ID:", id);
  setDropdownInOpen(false);
  setDropdownTicketOpen(false);
  setDropdownVehiclesOpen(false);
  setDropdownDateFromOpen(false);
  setDropdownDateToOpen(false);

  setRotateVehicles(0);
  setRotateIn(0);
  setRotateTicket(0);
  setRotateDateFrom(0);
  setRotateDateTo(0);
};

  return (
    <div className={styles.mainContainer}>
      <div className={styles.QuerryandlistHistory}>
        <div className={styles.Querry}>
            <div className={styles.Querrylist}>
                {/*Chọn đối tượng truy vấn */}
                <div className={styles.ChosseQuerry}>         
                    <span className={styles.text_title} style={{ fontSize: '13px', width: '59px', height: '22px' }}>Truy vấn:</span>
                    <button
                    className={styles.idQuerry}
                    onClick={toggleDropdownIn} // Sử dụng toggleDropdownIn
                    >
                    <span className={styles.text}>{in_id}</span>
                    <img
                        src="/assets/DropDown2.svg"
                        alt="dropdown"
                        style={{ transform: `rotate(${rotateIn}deg)`, transition: 'transform 0.3s ease' }}
                    />
                    </button>
                    {dropdownInOpen && (
                    <ul className={styles.dropdownList}>
                        {idList_Querry.map((id) => (
                        <li
                            key={id}
                            className={styles.dropdownItem}
                            onClick={() => selectInId(id)}
                        >
                            {id}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
                {/*Chọn loại vé và loại xe */}
                <div className={styles.Vehicles_Ticket}> 
                        <span className={styles.text_title} style={{ fontSize: '13px', width: '62px', height: '22px',marginLeft: '4px' }}>Loại vé:</span>
                        <button
                        className={styles.TicketType}
                        onClick={toggleDropdownTicket} // Sử dụng toggleDropdownIn
                        >
                        <span className={styles.text}>{in_Ticket}</span>
                        <img
                            src="/assets/DropDown2.svg"
                            alt="dropdown"
                            style={{ transform: `rotate(${rotateTicket}deg)`, transition: 'transform 0.3s ease' }}
                        />
                        </button>
                        {dropdownTicketOpen && (
                        <ul className={styles.dropdownListTicket}>
                            {idList_typeTicket.map((id) => (
                            <li
                                key={id}
                                className={`${styles.dropdownItemTicket} ${styles.text}`}
                                onClick={() => selectInId(id)}
                            >
                                {id}
                            </li>
                            ))}
                        </ul>
                        )}

                        <span className={styles.text_title} style={{ fontSize: '13px', width: '59px', height: '22px', marginLeft: '20px' }}>Loại xe:</span>
                        <button
                        className={styles.VehiclesType}
                        onClick={toggleDropdownVehicles} // Sử dụng toggleDropdownIn
                        >
                        <span className={styles.text}>{in_VehiclesType}</span>
                        <img
                            src="/assets/DropDown2.svg"
                            alt="dropdown"
                            style={{ transform: `rotate(${rotateVehiclesType}deg)`, transition: 'transform 0.3s ease' }}
                        />
                        </button>
                        {dropdownVehiclesOpen && (
                        <ul className={styles.dropdownListVehicles}>
                            {idList_typeVehicles.map((id) => (
                            <li
                                key={id}
                                className={`${styles.dropdownItemTicket} ${styles.text}`}
                                onClick={() => selectInId(id)}
                            >
                                {id}
                            </li>
                            ))}
                        </ul>
                        )}
                </div>
                {/*Chọn ngày */}
                <div className={styles.Vehicles_Ticket}> 
                        <span className={styles.text_title} style={{ fontSize: '13px', width: '64px', height: '22px',marginLeft: '4px' }}>Từ ngày:</span>
                        <button
                        className={styles.TicketType}
                        onClick={toggleDropdownDateFrom} // Sử dụng toggleDropdownIn
                        >
                        <span className={styles.text}>{in_fromDate}</span>
                        <img
                            src="/assets/DropDown2.svg"
                            alt="dropdown"
                            style={{ transform: `rotate(${rotateDateFrom}deg)`, transition: 'transform 0.3s ease' }}
                        />
                        </button>
                        {dropdownDateFromOpen && (
                        <ul className={styles.dropdownListTicket}>
                            {idList_Date.map((id) => (
                            <li
                                key={id}
                                className={`${styles.dropdownItemTicket} ${styles.text}`}
                                onClick={() => selectInId(id)}
                            >
                                {id}
                            </li>
                            ))}
                        </ul>
                        )}

                        <span className={styles.text_title} style={{ fontSize: '13px', width: '59px', height: '22px', marginLeft: '20px' }}>Đến:</span>
                        <button
                        className={styles.VehiclesType}
                        onClick={toggleDropdownDateTo} // Sử dụng toggleDropdownIn
                        >
                        <span className={styles.text}>{in_toDate}</span>
                        <img
                            src="/assets/DropDown2.svg"
                            alt="dropdown"
                            style={{ transform: `rotate(${rotateDateTo}deg)`, transition: 'transform 0.3s ease' }}
                        />
                        </button>
                        {dropdownDateToOpen && (
                        <ul className={styles.dropdownListVehicles}>
                            {idList_Date.map((id) => (
                            <li
                                key={id}
                                className={`${styles.dropdownItemTicket} ${styles.text}`}
                                onClick={() => selectInId(id)}
                            >
                                {id}
                            </li>
                            ))}
                        </ul>
                        )}
                </div>
                {/*Điền biển số và điền Mã thẻ */}
                <div className={styles.Plate_Card}>
                        <span className={styles.text_title} style={{ fontSize: '13px', width: '69px', height: '22px',marginLeft: '5px' }}>Biển số:</span>
                        <input placeholder="Nhập biển số xe"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                        className={styles.Plate} />

                        <span className={styles.text_title} style={{ fontSize: '13px', width: '64px', height: '22px',marginLeft: '18px' }}>Mã thẻ:</span>
                        <input placeholder="Nhập mã số thẻ"
                        value={CardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className={styles.Card} />
                </div>
            </div>
            {/*Nút tìm kiếm */}
            <div className={styles.SearchContainer}>
                <button className={styles.Search}>
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
                    <th>Thời gian ra</th>
                    <th>Thời gian vào</th>
                    <th>Loại xe</th>
                </tr>
                </thead>
                <tbody>
                {data.map((record, index) => (
                    <tr key={index}
                    className={index % 2 === 0 ? styles.odd : styles.even}>
                        <td>{record.maThe}</td>
                        <td>{record.bienSo}</td>
                        <td>{record.thoiGianRa}</td>
                        <td>{record.thoiGianVao}</td>
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
                        <span className={styles.text} style={{display: 'block'}}>Không có hình ảnh biển số</span>
                        )}
                    </div>
                    <div className={styles.ImageIN}>
                        <span className={styles.text} style={{color: 'white'}}>Hình ảnh vào</span>
                    </div>
                </div>
                <div className={styles.Screen2}>
                    <div className={styles.ImageContainer}>
                        {in_picture_Face ? (
                        <img src={in_picture_Face} alt="Gương mặt" />
                        ) : (
                        <span className={styles.text} style={{display: 'block'}}>Không có hình ảnh gương mặt</span>
                        )}
                    </div>
                </div>
                <div className={styles.Screen3}>
                    <div className={styles.ImageContainer}>
                        {out_picture_plate ? (
                        <img src={out_picture_plate} alt="Biển số" />
                        ) : (
                        <span className={styles.text} style={{display: 'block'}}>Không có hình ảnh biển số</span>
                        )}
                    </div>
                    <div className={styles.ImageOUT}>
                        <span className={styles.text} style={{color: 'white'}}>Hình ảnh ra</span>
                    </div>
                </div>
                <div className={styles.Screen4}>
                    <div className={styles.ImageContainer}>
                        {out_picture_Face ? (
                        <img src={out_picture_Face} alt="Gương mặt" />
                        ) : (
                        <span className={styles.text} style={{display: 'block'}}>Không có hình ảnh gương mặt</span>
                        )}
                    </div>
                </div>
            </div>
        </div> 
    </div>
  );
};

export default MainScreen;