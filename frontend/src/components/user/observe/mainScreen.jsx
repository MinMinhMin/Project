import styles from "../../../styles/user/mainScreen.module.css";
import React, { useRef, useState, useEffect, use } from "react";

import axios from "axios";

import FaceCamera from "./FaceCamera";
import PlateCamera from "./PlateCamera";

const backendUrl_AI = import.meta.env.VITE_API_URL_AI;

const MainScreen = ({
  in_id, // ID thẻ vào
  out_id, // ID thẻ ra
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

  const idList_OUT = [
    "000011",
    "000012",
    "000013",
    "000014",
    "000015",
    "000016",
    "000017",
    "000018",
    "000019",
    "000020",
  ];
  //In gate
  const [InId, setInId] = useState("Choose ID");
  const [DateIn, setDateIn] = useState(null);
  const [TimeIn, setTimeIn] = useState(null);
  const [plateNumberIn, setPlateNumberIn] = useState(null);
  const [in_face_img, setInFaceImg] = useState(null);
  const [in_plate_img, setInPlateImg] = useState(null);
  const [cameraMessageIn, setCameraMessageIn] = useState("");
  const [cameraStatusIn, setCameraStatusIn] = useState(false);

  const faceVideoRef_In = useRef(null);
  const plateVideoRef_In = useRef(null);
  const faceCameraRef_In = useRef(null); // component handle (takeSnapshot)
  const plateCameraRef_In = useRef(null); // component handle (takeSnapshot)

  //Out gate
  const [OutId, setOutId] = useState("Choose ID");
  const [DateOut, setDateOut] = useState(null);
  const [TimeOut, setTimeOut] = useState(null);
  const [plateNumberOut, setPlateNumberOut] = useState(null);
  const [out_face_img, setOutFaceImg] = useState(null);
  const [out_plate_img, setOutPlateImg] = useState(null);
  const [cameraMessageOut, setCameraMessageOut] = useState("");
  const [cameraStatusOut, setCameraStatusOut] = useState(false);

  const faceVideoRef_Out = useRef(null);
  const plateVideoRef_Out = useRef(null);
  const faceCameraRef_Out = useRef(null); // component handle (takeSnapshot)
  const plateCameraRef_Out = useRef(null); // component handle (takeSnapshot)

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

  // Plate Image -> Plate Number

  function getPlateNumberFromImage(base64String, gate) {
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
    formData.append("plate_image", blob, "snapshot.jpg");

    axios
      .post(`${backendUrl_AI}/AI/getPlateNumber`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Plate number recognized:", response.data.license_plate);
        if (gate === "IN") {
          setPlateNumberIn(response.data.license_plate);
        } else {
          setPlateNumberOut(response.data.license_plate);
        }
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
    setInId(id);
    setRotateIn(0); // Quay về 0 độ sau khi chọn
  };

  const selectOutId = (id) => {
    console.log("Selected out ID:", id);
    setDropdownOutOpen(false);
    setOutId(id);
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

  useEffect(() => {
    const startCamera = (cameraRef, deviceIndex) => {
      cameraRef.current?.startStream?.(deviceIndex);
    };
    const stopCamera = (cameraRef) => {
      cameraRef.current?.stopStream?.();
    };

    // Handle starting/stopping for In
    if (cameraStatusIn) {
      startCamera(faceCameraRef_In, 1);
      startCamera(plateCameraRef_In, 0);
    } else {
      stopCamera(faceCameraRef_In);
      stopCamera(plateCameraRef_In);
    }

    // Handle starting/stopping for Out
    if (cameraStatusOut) {
      startCamera(faceCameraRef_Out, 1);
      startCamera(plateCameraRef_Out, 0);
    } else {
      stopCamera(faceCameraRef_Out);
      stopCamera(plateCameraRef_Out);
    }

    // Cleanup on unmount
    return () => {
      [
        faceCameraRef_In,
        plateCameraRef_In,
        faceCameraRef_Out,
        plateCameraRef_Out,
      ].forEach((ref) => stopCamera(ref));
    };
  }, [cameraStatusIn, cameraStatusOut]);

  const in_button_handle = () => {
    setCameraMessageIn("Capturing...");
    setTimeout(() => {
      //&& plateVideoRef_In.current
      if (faceVideoRef_In.current && plateVideoRef_In.current) {
        const faceImg = faceCameraRef_In.current.takeSnapshot();
        const plateImg = plateCameraRef_In.current.takeSnapshot();
        if (faceImg && plateImg) {
          setInFaceImg(faceImg);
          setInPlateImg(plateImg);
          setTimeIn(getCurrentTime());
          setDateIn(getCurrentDateInfo());
          getPlateNumberFromImage(plateImg, "IN");
          setCameraMessageIn("Done");
          console.log("Captured face and plate images");
        } else {
          setCameraMessageIn("Try again");
          console.log("Failed to capture images");
        }
        // setInPlateImg(plateImg);
      }
    }, 2000); // wait 2 seconds
  };

  const out_button_handle = () => {
    setCameraMessageOut("Capturing...");
    setTimeout(() => {
      //&& plateVideoRef_In.current
      if (faceVideoRef_Out.current && plateVideoRef_Out.current) {
        const faceImg = faceCameraRef_Out.current.takeSnapshot();
        const plateImg = plateCameraRef_Out.current.takeSnapshot();
        if (faceImg && plateImg) {
          setOutFaceImg(faceImg);
          setOutPlateImg(plateImg);
          setTimeOut(getCurrentTime());
          setDateOut(getCurrentDateInfo());
          getPlateNumberFromImage(plateImg, "OUT");
          setCameraMessageOut("Done");
          console.log("Captured face and plate images");
        } else {
          setCameraMessageOut("Try again");
          console.log("Failed to capture images");
        }
        // setInPlateImg(plateImg);
      }
    }, 2000); // wait 2 seconds
  };

  const cameraInHandle = () => {
    setCameraStatusIn(!cameraStatusIn);
  };

  const cameraOutHandle = () => {
    setCameraStatusOut(!cameraStatusOut);
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
                <button className={styles["id"]} onClick={toggleDropdownIn}>
                  {InId}
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
                  <img src="/assets/scan2.svg" alt="scan" />
                </button>
              </div>
            </div>
          </div>

          {/* Vùng video quay */}
          <div className={styles["container-video-cam"]}>
            <div className={styles["container-button"]}>
              <p>Video Cam</p>
              <button
                className={styles["cam-controller"]}
                onClick={cameraInHandle}
              >
                Turn on/off
              </button>
            </div>

            {/* add css */}
            <div className={styles["cam-message-in"]}>{cameraMessageIn}</div>
            {/* add css */}
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>
                Mặt sau
                <PlateCamera
                  videoRef={plateVideoRef_In}
                  ref={plateCameraRef_In}
                />
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>
                Mặt trước
                <FaceCamera videoRef={faceVideoRef_In} ref={faceCameraRef_In} />
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
            <p>Làn Ra</p>

            <div className={styles["container-id-scan"]}>
              {/* Vùng ID */}
              <div className={styles["container-id"]}>
                ID thẻ
                <button className={styles["id"]} onClick={toggleDropdownOut}>
                  {OutId}
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
                <button className={styles.scan} onClick={out_button_handle}>
                  <img src="/assets/scan2.svg" alt="scan" />
                </button>
              </div>
            </div>
          </div>

          {/* Vùng video quay */}
          <div className={styles["container-video-cam"]}>
            <div className={styles["container-button"]}>
              <p>Video Cam</p>
              <button
                className={styles["cam-controller"]}
                onClick={cameraOutHandle}
              >
                Turn on/off
              </button>
            </div>
            {/* add css */}
            <div className={styles["cam-message-out"]}>{cameraMessageOut}</div>
            {/* add css */}
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>
                Mặt sau
                <PlateCamera
                  videoRef={plateVideoRef_Out}
                  ref={plateCameraRef_Out}
                />
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>
                Mặt trước
                <FaceCamera
                  videoRef={faceVideoRef_Out}
                  ref={faceCameraRef_Out}
                />
              </div>
            </div>
          </div>
          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-picture-back"]} ${styles["cam"]}`}>
                Mặt sau
                {out_plate_img ? (
                  <img
                    src={out_plate_img}
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
                Mặt trước Mặt trước
                {out_face_img ? (
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
                <span>Ngày ra</span>
                {DateOut || "No Info"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["time-in"]}>
                <span>Giờ ra</span>
                {TimeOut || "No Info"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["plate"]}>
                <span>Biển số xe ra</span>
                <p>{plateNumberOut}</p>
              </div>
            </div>
            <div className={styles["img-info"]}>
              <div className={styles["img-face"]}>
                Ảnh chụp khuôn mặt
                {out_face_img ? (
                  <img
                    src={out_face_img}
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
                {out_plate_img ? (
                  <img
                    src={out_plate_img}
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
      </div>
      {/* ======================VÙNG HIỆN TRẠNG THÁI========================== */}
      <div className={styles["status"]}>{"Mời xe ra" || status}</div>
    </div>
  );
};

export default MainScreen;
