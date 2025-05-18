import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/user/mainScreen.module.css";

const MainScreen = ({
  in_id = "000001",
  in_video_back,
  in_video_front,
  in_picture_back,
  in_picture_front,
  in_face_img,
  in_plate_img,
  in_plate_content = "47-B2-722.38",
  out_id = "000001",
  out_video_back,
  out_video_front,
  out_picture_back,
  out_picture_front,
  out_face,
  out_plate,
  out_plate_content = "47-B2-722.38",
  status = "Mời xe ra",
}) => {
  // State quản lý dropdown
  const [dropdownInOpen, setDropdownInOpen] = useState(false);
  const [dropdownOutOpen, setDropdownOutOpen] = useState(false);
  const [rotateIn, setRotateIn] = useState(0); // Góc quay cho làn vào
  const [rotateOut, setRotateOut] = useState(0); // Góc quay cho làn ra

  // Danh sách ID giả lập
  const idList_IN = [
    "000001", "000002", "000003", "000004", "000005",
    "000006", "000007", "000008", "000009", "000010"
  ];

  const idList_OUT = [
    "000011", "000012", "000013", "000014", "000015",
    "000016", "000017", "000018", "000019", "000020"
  ];

  // Ref để bắt sự kiện click ngoài
  const refIn = useRef(null);
  const refOut = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (refIn.current && !refIn.current.contains(event.target)) {
        setDropdownInOpen(false);
        setRotateIn(0); // Quay về 0 độ khi đóng
      }
      if (refOut.current && !refOut.current.contains(event.target)) {
        setDropdownOutOpen(false);
        setRotateOut(0); // Quay về 0 độ khi đóng
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hàm chọn ID trong dropdown
  const selectInId = (id) => {
    console.log("Selected in ID:", id);
    setDropdownInOpen(false);
    setRotateIn(0); // Quay về 0 độ sau khi chọn
  };

  const selectOutId = (id) => {
    console.log("Selected out ID:", id);
    setDropdownOutOpen(false);
    setRotateOut(0); // Quay về 0 độ sau khi chọn
  };

  const toggleDropdownIn = () => {
    setDropdownInOpen(!dropdownInOpen);
    setRotateIn(dropdownInOpen ? 0 : 180); // Quay 180 độ khi mở, 0 độ khi đóng
  };

  const toggleDropdownOut = () => {
    setDropdownOutOpen(!dropdownOutOpen);
    setRotateOut(dropdownOutOpen ? 0 : 180); // Quay 180 độ khi mở, 0 độ khi đóng
  };

  return (
    <div className={styles.container}>
      <div className={styles["cam-and-info"]}>
        {/* ======================VÙNG LÀN VÀO========================== */}
        <div className={styles["front-side"]}>
          <div className={styles["choose-bar"]}>
            <p>Làn vào</p>
            <div className={styles["container-id-scan"]}>
              {/* Vùng ID */}
              <div className={styles["container-id"]} ref={refIn}>
                <span>ID thẻ</span>
                <button
                  className={styles.id}
                  onClick={toggleDropdownIn} // Sử dụng toggleDropdownIn
                >
                  {in_id}
                  <img
                    src="/assets/dropdown.svg"
                    alt="dropdown"
                    style={{ transform: `rotate(${rotateIn}deg)`, transition: 'transform 0.3s ease' }}
                  />
                </button>
                {dropdownInOpen && (
                  <ul className={styles["dropdown-list"]}>
                    {idList_IN.map((id) => (
                      <li
                        key={id}
                        className={styles["dropdown-item"]}
                        onClick={() => selectInId(id)}
                      >
                        {id}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Vùng quẹt thẻ */}
              <div className={styles["container-scan"]}>
                <span>Quẹt thẻ</span>
                <button className={styles.scan}>
                  <img src="/assets/scan2.svg" alt="scan" />
                </button>
              </div>
            </div>
          </div>
          {/* Vùng video quay */}
          <div className={styles["container-video-cam"]}>
            <p>Video Cam</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles.cam}`}>
                <span>Mặt sau</span>
                {in_video_back ? (
                  <video controls>
                    <source src={in_video_back} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  "Unconnect back camera"
                )}
              </div>
              <div className={`${styles["in-video-front"]} ${styles.cam}`}>
                <span>Mặt trước</span>
                {in_video_front ? (
                  <video controls>
                    <source src={in_video_front} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  "Unconnect front camera"
                )}
              </div>
            </div>
          </div>
          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-picture-back"]} ${styles.cam}`}>
                <span>Mặt sau</span>
                {in_picture_back ? (
                  <img src={in_picture_back} alt="Mặt sau" />
                ) : (
                  "No image"
                )}
              </div>
              <div className={`${styles["in-picture-front"]} ${styles.cam}`}>
                <span>Mặt trước</span>
                {in_picture_front ? (
                  <img src={in_picture_front} alt="Mặt trước" />
                ) : (
                  "No image"
                )}
              </div>
            </div>
          </div>
          {/* Vùng nhận diện thông tin */}
          <div className={styles["container-info"]}>
            <div className={styles["text-info"]}>
              <div className={styles["day-in"]}>
                <span>Ngày vào</span>
                <p>14/05/2025</p>
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["time-in"]}>
                <span>Giờ vào</span>
                <p>17:34:28</p>
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["plate"]}>
                <span>Biển số xe vào</span>
                <p>{in_plate_content}</p>
              </div>
            </div>
            <div className={styles["img-info"]}>
              <div className={styles["img-face"]}>
                Ảnh chụp khuôn mặt
                {in_face_img && <img src={in_face_img} alt="Khuôn mặt" />}
              </div>
              <div className={styles["img-plate"]}>
                Ảnh chụp biển số
                {in_plate_img && <img src={in_plate_img} alt="Biển số" />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles["vertical-line"]}></div>
        {/* ======================VÙNG LÀN RA========================== */}
        <div className={styles["back-side"]}>
          <div className={styles["choose-bar"]}>
            <p>Làn ra</p>
            <div className={styles["container-id-scan"]}>
              {/* Vùng ID */}
              <div className={styles["container-id"]} ref={refOut}>
                <span>ID thẻ</span>
                <button
                  className={styles.id}
                  onClick={toggleDropdownOut} // Sử dụng toggleDropdownOut
                >
                  {out_id}
                  <img
                    src="/assets/dropdown.svg"
                    alt="dropdown"
                    style={{ transform: `rotate(${rotateOut}deg)`, transition: 'transform 0.3s ease' }}
                  />
                </button>
                {dropdownOutOpen && (
                  <ul className={styles["dropdown-list"]}>
                    {idList_OUT.map((id) => (
                      <li
                        key={id}
                        className={styles["dropdown-item"]}
                        onClick={() => selectOutId(id)}
                      >
                        {id}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Vùng quẹt thẻ */}
              <div className={styles["container-scan"]}>
                <span>Quẹt thẻ</span>
                <button className={styles.scan}>
                  <img src="/assets/scan2.svg" alt="scan" />
                </button>
              </div>
            </div>
          </div>
          {/* Vùng video quay */}
          <div className={styles["container-video-cam"]}>
            <p>Video Cam</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["out-video-back"]} ${styles.cam}`}>
                <span>Mặt sau</span>
                {out_video_back ? (
                  <video controls>
                    <source src={out_video_back} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  "Unconnect back camera"
                )}
              </div>
              <div className={`${styles["out-video-front"]} ${styles.cam}`}>
                <span>Mặt trước</span>
                {out_video_front ? (
                  <video controls>
                    <source src={out_video_front} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  "Unconnect front camera"
                )}
              </div>
            </div>
          </div>
          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["out-picture-back"]} ${styles.cam}`}>
                <span>Mặt sau</span>
                {out_picture_back ? (
                  <img src={out_picture_back} alt="Mặt sau" />
                ) : (
                  "No image"
                )}
              </div>
              <div className={`${styles["out-picture-front"]} ${styles.cam}`}>
                <span>Mặt trước</span>
                {out_picture_front ? (
                  <img src={out_picture_front} alt="Mặt trước" />
                ) : (
                  "No image"
                )}
              </div>
            </div>
          </div>
          {/* Vùng nhận diện thông tin */}
          <div className={styles["container-info"]}>
            <div className={styles["text-info"]}>
              <div className={styles["day-in"]}>
                <span>Ngày ra</span>
                <p>14/05/2025</p>
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["time-in"]}>
                <span>Giờ ra</span>
                <p>17:34:28</p>
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["plate"]}>
                <span>Biển số xe ra</span>
                <p>{out_plate_content}</p>
              </div>
            </div>
            <div className={styles["img-info"]}>
              <div className={styles["img-face"]}>
                Ảnh chụp khuôn mặt
                {out_face && <img src={out_face} alt="Khuôn mặt" />}
              </div>
              <div className={styles["img-plate"]}>
                Ảnh chụp biển số
                {out_plate && <img src={out_plate} alt="Biển số" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ======================VÙNG HIỆN TRẠNG THÁI========================== */}
      <div className={styles.status}>{status}</div>
    </div>
  );
};

export default MainScreen;