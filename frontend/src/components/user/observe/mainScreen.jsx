import styles from "../../../styles/user/mainScreen.module.css";
import React, { useRef, useState, useEffect, use } from "react";

import axios from "axios";

import FaceCamera from "./FaceCamera";
import PlateCamera from "./PlateCamera";

const backendUrl_AI = import.meta.env.VITE_API_URL_AI;

const MainScreen = ({
  in_id, // ID thẻ vào
  in_video_back, // Video quay mặt sau ở làn vào
  in_video_front, // Video quay mặt trước ở làn vào

  in_plate_content, // Biển số sau khi nhận diện
  // Tương tự ở làn ra
  out_id,
  out_video_back,
  out_video_front,

  out_plate_content,
  // Trạng thái so sánh: Mời xe ra, Biển không khớp, Mặt không khớp
  status,
}) => {
  const [dropdownInOpen, setDropdownInOpen] = useState(false);
  const [dropdownOutOpen, setDropdownOutOpen] = useState(false);
  const [rotateIn, setRotateIn] = useState(0); // Góc quay cho làn vào
  const [rotateOut, setRotateOut] = useState(0); // Góc quay cho làn ra

  // Danh sách ID giả lập
  const idList_IN = [
    "000001",
    "000002",
    "000003",
    "000004",
    "000005",
    "000006",
    "000007",
    "000008",
    "000009",
    "000010",
  ];

  const [id, setId] = useState("0000001");
  const [DateIn, setDateIn] = useState(null);
  const [TimeIn, setTimeIn] = useState(null);
  const [plateNumberIn, setPlateNumberIn] = useState(null);

  const [in_face_img, setInFaceImg] = useState(null);
  const [in_plate_img, setInPlateImg] = useState(null);

  //get Time
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  //Get Date
  function getCurrentDateInfo() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // months are 0-indexed
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Ref để bắt sự kiện click ngoài
  const refIn = useRef(null);
  const refOut = useRef(null);
  function getPlateNumberFromImage(base64String) {
    const formData = new FormData();

    // Convert base64 to a Blob
    const byteString = atob(base64String.split(",")[1]); // decode base64
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0]; // get MIME type

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    // Append to FormData
    formData.append("plate_image", blob, "snapshot.jpg");

    axios
      .post(`${backendUrl_AI}/AI/getPlateNumber`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPlateNumberIn(response.data.license_plate); // handle the detected license plate
      })
      .catch((error) => {
        console.error("Error recognizing plate:", error);
      });
  }

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

  const faceVideoRef = useRef(null);
  const plateVideoRef = useRef(null);

  const faceCameraRef = useRef(null); // component handle (takeSnapshot)
  const plateCameraRef = useRef(null); // component handle (takeSnapshot)

  const [cameraMessage, setCameraMessage] = useState("");

  useEffect(() => {
    const startCamera = async (videoRef, deviceIndex = 0) => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        if (videoDevices.length === 0) throw new Error("No camera found");

        const selectedDeviceId =
          videoDevices[deviceIndex]?.deviceId || videoDevices[0].deviceId;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId } },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    startCamera(faceVideoRef, 0); // Face cam: built-in
    startCamera(plateVideoRef, 1); // Plate cam: external

    return () => {
      [faceVideoRef, plateVideoRef].forEach((ref) => {
        ref.current?.srcObject?.getTracks().forEach((track) => track.stop());
      });
    };
  }, []);

  const in_button_handle = () => {
    setCameraMessage("Capturing...");
    setTimeout(() => {
      //&& plateVideoRef.current
      if (faceVideoRef.current && plateVideoRef.current) {
        const faceImg = faceCameraRef.current.takeSnapshot();
        const plateImg = plateCameraRef.current.takeSnapshot();
        if (faceImg && plateImg) {
          setInFaceImg(faceImg);
          setInPlateImg(plateImg);
          setTimeIn(getCurrentTime());
          setDateIn(getCurrentDateInfo());
          getPlateNumberFromImage(plateImg);
          setCameraMessage("Done");
          console.log("Captured face and plate images");
        } else {
          setCameraMessage("Try again");
          console.log("Failed to capture images");
        }
        // setInPlateImg(plateImg);
      }
    }, 2000); // wait 2 seconds
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
              <div className={styles["container-id"]}>
                ID thẻ
                <button className={styles["id"]}>
                  {"0000001" || out_id}
                  <img src="/assets/dropdown.svg" alt="dropdown" />
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
                Quẹt thẻ
                <button className={styles["scan"]} onClick={in_button_handle}>
                  <img src="/assets/scan.svg" alt="scan" />
                </button>
              </div>
            </div>
          </div>

          {/* Vùng video quay */}
          <div className={styles["container-video-cam"]}>
            <p>Video Cam</p>
            <div className={styles["cam-message"]}>{cameraMessage}</div>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>
                Mặt sau
                <PlateCamera videoRef={plateVideoRef} ref={plateCameraRef} />
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>
                Mặt trước
                <FaceCamera videoRef={faceVideoRef} ref={faceCameraRef} />
              </div>
            </div>
          </div>
          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-picture-back"]} ${styles["cam"]}`}>
                Mặt sau
                {in_plate_img ? (
                  <img
                    src={in_plate_img}
                    alt="Mặt sau"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  "No image"
                )}
              </div>
              <div className={`${styles["in-picture-front"]} ${styles["cam"]}`}>
                Mặt trước
                {in_face_img ? (
                  <img
                    src={in_face_img}
                    alt="Mặt trước"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
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
                {DateIn || "No Info"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["time-in"]}>
                <span>Giờ vào</span>
                {TimeIn || "No Info"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["plate"]}>
                <span>Biển số xe vào</span>
                <p>{plateNumberIn}</p>
              </div>
            </div>
            <div className={styles["img-info"]}>
              <div className={styles["img-face"]}>
                Ảnh chụp khuôn mặt
                {in_face_img ? (
                  <img
                    src={in_face_img}
                    alt="Mặt sau"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  "No image"
                )}
              </div>
              <div className={styles["img-plate"]}>
                Ảnh chụp biển số
                {in_plate_img ? (
                  <img
                    src={in_plate_img}
                    alt="Mặt sau"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  "No image"
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles["vertical-line"]}></div>
        {/* ======================VÙNG LÀN RA========================== */}
        <div className={styles["back-side"]}>
          <div className={styles["choose-bar"]}>
            <p>Làn vào</p>

            <div className={styles["container-id-scan"]}>
              {/* Vùng ID */}
              <div className={styles["container-id"]}>
                ID thẻ
                <button className={styles["id"]}>
                  {"0000001" || in_id}
                  <img src="/assets/dropdown.svg" alt="dropdown" />
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
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>
                Mặt sau
                {"Unconnect back camera" || in_video_back}
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>
                Mặt trước
                {"Unconnect back camera" || in_video_front}
              </div>
            </div>
          </div>
          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-picture-back"]} ${styles["cam"]}`}>
                Mặt sau
                {/* {in_plate_img ? (
                  <img src={in_plate_img} alt="Mặt sau" />
                ) : (
                  "No image"
                )} */}
              </div>
              <div className={`${styles["in-picture-front"]} ${styles["cam"]}`}>
                Mặt trước
                {/* {in_face_img ? (
                  <img src={in_face_img} alt="Mặt trước" />
                ) : (
                  "No image"
                )} */}
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
              <div className={styles["img-face"]}>Ảnh chụp khuôn mặt</div>
              <div className={styles["img-plate"]}>Ảnh chụp biển số</div>
            </div>
          </div>
        </div>
      </div>
      {/* ======================VÙNG HIỆN TRẠNG THÁI========================== */}
      <div className={styles["status"]}>{"Mời xe ra" || status}</div>
    </div>
  );
};

export default MainScreen;
