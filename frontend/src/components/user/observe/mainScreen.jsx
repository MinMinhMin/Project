import styles from "../../../styles/user/mainScreen.module.css";
import React, { useRef, useState, useEffect, use } from "react";

import axios from "axios";

import FaceCamera from "./FaceCamera";
import PlateCamera from "./PlateCamera";

const backendUrl_AI = import.meta.env.VITE_API_URL_AI;
const backendUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");
const MainScreen = ({ status }) => {
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
    "000001",
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
  const [InId, setInId] = useState("None");
  const [DateIn, setDateIn] = useState(null);
  const [TimeIn, setTimeIn] = useState(null);
  const [plateNumberIn, setPlateNumberIn] = useState(null);
  const [faceEmbebdingIn, setFaceEmbeddingIn] = useState(null);
  const [in_face_img, setInFaceImg] = useState(null);
  const [in_plate_img, setInPlateImg] = useState(null);
  const [cameraMessageIn, setCameraMessageIn] = useState("");
  const [cameraStatusIn, setCameraStatusIn] = useState(false);

  const faceVideoRef_In = useRef(null);
  const plateVideoRef_In = useRef(null);
  const faceCameraRef_In = useRef(null); // component handle (takeSnapshot)
  const plateCameraRef_In = useRef(null); // component handle (takeSnapshot)

  const [faceImgIn_path, setFaceImgIn_path] = useState(null);
  const [plateImgIn_path, setPlateImgIn_path] = useState(null);
  //Out gate
  const [OutId, setOutId] = useState("None");
  const [DateOut, setDateOut] = useState(null);
  const [TimeOut, setTimeOut] = useState(null);
  const [plateNumberOut, setPlateNumberOut] = useState(null);
  const [faceEmbeddingOut, setFaceEmbeddingOut] = useState(null);
  const [out_face_img, setOutFaceImg] = useState(null);
  const [out_plate_img, setOutPlateImg] = useState(null);
  const [cameraMessageOut, setCameraMessageOut] = useState("");
  const [cameraStatusOut, setCameraStatusOut] = useState(false);

  const faceVideoRef_Out = useRef(null);
  const plateVideoRef_Out = useRef(null);
  const faceCameraRef_Out = useRef(null); // component handle (takeSnapshot)
  const plateCameraRef_Out = useRef(null); // component handle (takeSnapshot)

  const [faceImgOut_path, setFaceImgOut_path] = useState(null);
  const [plateImgOut_path, setPlateImgOut_path] = useState(null);

  //get Time
  function getCurrentTime() {
    const now = new Date();
    const time = now.toTimeString().split(" ")[0];
    return time;
  }

  //Get Date
  function getCurrentDateInfo() {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    return date;
  }

  // Ref để bắt sự kiện click ngoài
  const refIn = useRef(null);
  const refOut = useRef(null);

  // Plate Image -> Plate Number

  async function getPlateNumberFromImage(base64String, gate) {
    if (gate === "In") {
      setCameraMessageIn("Plate -> Number...");
    } else {
      setCameraMessageOut("Plate -> Number...");
    }
    const formData = new FormData();

    // Convert base64 to Blob
    const byteString = atob(base64String.split(",")[1]); // decode base64
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0]; // get MIME type

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    formData.append("plate_image", blob, "snapshot.jpg");

    try {
      const response = await axios.post(
        `${backendUrl_AI}/AI/getPlateNumber`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.license_plate; // return the recognized plate number
    } catch (error) {
      console.error("Error recognizing plate:", error);
      throw error; // re-throw error so caller can handle it if needed
    }
  }

  async function getFaceEmbedding(base64String, gate) {
    if (gate === "In") {
      setCameraMessageIn("Face -> Embedding...");
    } else {
      setCameraMessageOut("Face -> Embedding...");
    }
    const formData = new FormData();

    // Convert base64 to Blob
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    formData.append("face_image", blob, "snapshot.jpg");

    try {
      const response = await axios.post(
        `${backendUrl_AI}/AI/getFaceEmbedding`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.embedding;
    } catch (error) {
      console.error("Error recognizing face:", error);
      throw error;
    }
  }

  async function uploadBase64ToImgBB(base64Image, gate) {
    if (gate === "In") {
      setCameraMessageIn("Uploading to Imgbb...");
    } else {
      setCameraMessageOut("Uploading to Imgbb...");
    }
    const cleanBase64 = base64Image.split(",")[1];
    try {
      const response = await axios.post(
        `${backendUrl}/history/upload_to_imgbb`,
        {
          image: cleanBase64,
        }
      );
      return response.data.link; // Return the link
    } catch (error) {
      console.error("Error when uploading to Imgbb:", error);
      throw error; // Re-throw error if you want caller to handle it
    }
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

  const createHistory_In = async (
    face_image_path_IN,
    license_plate_image_path_IN,
    face_embedding_IN,
    license_plate_IN,
    face_image_path_OUT,
    license_plate_image_path_OUT,
    face_embedding_OUT,
    license_plate_OUT,
    date_in,
    date_out,
    time_in,
    time_out,
    ticket_id,
    ticket_type,
    vehicle_type,
    parking_lot_id
  ) => {
    setCameraMessageIn("Creating history...");
    const payload = {
      face_image_path_IN: face_image_path_IN,
      license_plate_image_path_IN: license_plate_image_path_IN,
      face_embedding_IN: face_embedding_IN,
      license_plate_IN: license_plate_IN,
      face_image_path_OUT: face_image_path_OUT,
      license_plate_image_path_OUT: license_plate_image_path_OUT,
      face_embedding_OUT: face_embedding_OUT,
      license_plate_OUT: license_plate_OUT,
      date_in: date_in,
      date_out: date_out,
      time_in: time_in,
      time_out: time_out,
      ticket_id: ticket_id,
      ticket_type: ticket_type,
      vehicle_type: vehicle_type,
      parking_lot_id: parking_lot_id,
    };

    try {
      const res = await axios.post(`${backendUrl}/history/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Change URL if needed
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  async function getHistoryIn(ticket_id, license_plate) {
    setCameraMessageOut("Getting history...");
    try {
      const res = await axios.get(`${backendUrl}/history/search/last`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ticket_id: ticket_id,
          license_plate: license_plate,
        },
      });
      return res.data;
    } catch (err) {
      console.error("API Error:", err);
    }
  }

  async function updateHistoryOut(
    id,
    face_image_path_OUT,
    license_plate_image_path_OUT,
    face_embedding_OUT,
    license_plate_OUT,
    date_out,
    time_out
  ) {
    setCameraMessageOut("Updating history...");
    try {
      const res = await axios.put(
        `${backendUrl}/history/update/${id}`,
        {
          face_image_path_OUT: face_image_path_OUT,
          license_plate_image_path_OUT: license_plate_image_path_OUT,
          face_embedding_OUT: face_embedding_OUT,
          license_plate_OUT: license_plate_OUT,
          date_out: date_out,
          time_out: time_out,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
    }
  }

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

  const processInGate = async (faceImg, plateImg) => {
    const timeIn = getCurrentTime();
    const dateIn = getCurrentDateInfo();
    const faceUrl = await uploadBase64ToImgBB(faceImg, "In");
    const plateUrl = await uploadBase64ToImgBB(plateImg, "In");
    const plateNumber = await getPlateNumberFromImage(plateImg, "In");
    const faceEmbedding = await getFaceEmbedding(faceImg, "In");

    setTimeIn(timeIn);
    setDateIn(dateIn);
    setFaceImgIn_path(faceUrl);
    setPlateImgIn_path(plateUrl);
    setPlateNumberIn(plateNumber);
    setFaceEmbeddingIn(faceEmbedding);

    createHistory_In(
      faceUrl,
      plateUrl,
      faceEmbedding,
      plateNumber,
      null,
      null,
      null,
      null,
      dateIn,
      null,
      timeIn,
      null,
      InId,
      "Vé lượt",
      "Xe máy",
      1
    );

    // console.log("Face URL:", faceImgIn_path);
    // console.log("Plate URL:", plateImgIn_path);
    // console.log("Plate Number:", plateNumberIn);
    // console.log("Face Embedding:", faceEmbebdingIn);
    console.log("Face URL:", faceUrl);
    console.log("Plate URL:", plateUrl);
    console.log("Plate Number:", plateNumber);
    console.log("Face Embedding:", faceEmbedding);
    setCameraMessageIn("Done");
  };

  const processOutGate = async (faceImg, plateImg) => {
    const timeOut = getCurrentTime();
    const dateOut = getCurrentDateInfo();
    const faceUrl = await uploadBase64ToImgBB(faceImg, "Out");
    const plateUrl = await uploadBase64ToImgBB(plateImg, "Out");
    const plateNumber = await getPlateNumberFromImage(plateImg, "Out");
    const faceEmbedding = await getFaceEmbedding(faceImg, "Out");

    setTimeOut(timeOut);
    setDateOut(dateOut);
    setFaceImgOut_path(faceUrl);
    setPlateImgOut_path(plateUrl);
    setPlateNumberOut(plateNumber);
    setFaceEmbeddingOut(faceEmbedding);

    const getRespond = await getHistoryIn(OutId, plateNumber);

    console.log("Face URL:", faceUrl);
    console.log("Plate URL:", plateUrl);
    console.log("Plate Number:", plateNumber);
    console.log("Face Embedding:", faceEmbedding);
    console.log("Get Respond:", getRespond);

    if (getRespond) {
      const id = getRespond.id;
      const updateRespond = await updateHistoryOut(
        id,
        faceUrl,
        plateUrl,
        faceEmbedding,
        plateNumber,
        dateOut,
        timeOut
      );
      console.log("Update Respond:", updateRespond);
      setCameraMessageOut("Done");
    } else {
      setCameraMessageOut("No history found");
    }
  };

  const in_button_handle = async () => {
    setCameraMessageIn("Capturing...");
    setTimeout(async () => {
      // ⬅ Make the callback async
      if (faceVideoRef_In.current && plateVideoRef_In.current) {
        const faceImg = faceCameraRef_In.current.takeSnapshot();
        const plateImg = plateCameraRef_In.current.takeSnapshot();

        if (faceImg && plateImg) {
          setInFaceImg(faceImg);
          setInPlateImg(plateImg);
          setTimeIn(getCurrentTime());
          setDateIn(getCurrentDateInfo());

          try {
            await processInGate(faceImg, plateImg); // ✅ Now this works!
            console.log("Captured face and plate images");
          } catch (err) {
            setCameraMessageIn("Processing failed");
            console.error("Error during processInGate:", err);
          }
        } else {
          setCameraMessageIn("Try again");
          console.log("Failed to capture images");
        }
      }
    }, 2000); // wait 2 seconds
  };

  const out_button_handle = async () => {
    setCameraMessageOut("Capturing...");
    setTimeout(async () => {
      // ⬅ Make the callback async
      if (faceVideoRef_Out.current && plateVideoRef_Out.current) {
        const faceImg = faceCameraRef_Out.current.takeSnapshot();
        const plateImg = plateCameraRef_Out.current.takeSnapshot();

        if (faceImg && plateImg) {
          setOutFaceImg(faceImg);
          setOutPlateImg(plateImg);

          try {
            await processOutGate(faceImg, plateImg); // ✅ Now this works!
            console.log("Captured face and plate images");
          } catch (err) {
            setCameraMessageOut("Processing failed");
            console.error("Error during processInGate:", err);
          }
        } else {
          setCameraMessageOut("Try again");
          console.log("Failed to capture images");
        }
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

              {/* add css */}
              <div className={styles["cam-message"]}>{cameraMessageIn}</div>
              {/* add css */}
            </div>

            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>
                <p>Mặt sau</p>
                <PlateCamera
                  videoRef={plateVideoRef_In}
                  ref={plateCameraRef_In}
                />
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>
                <p>Mặt trước</p>
                <FaceCamera videoRef={faceVideoRef_In} ref={faceCameraRef_In} />
              </div>
            </div>
          </div>
          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-picture-back"]} ${styles["cam"]}`}>
                <p>Mặt sau</p>
                <img
                  src={in_plate_img}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className={`${styles["in-picture-front"]} ${styles["cam"]}`}>
                <p>Mặt trước</p>
                <img
                  src={in_face_img}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Vùng nhận diện thông tin */}
          <div className={styles["container-info"]}>
            <div className={styles["text-info"]}>
              <div className={styles["day-in"]}>
                <span>Ngày vào</span>
                {DateIn || "00/00/00"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["time-in"]}>
                <span>Giờ vào</span>
                {TimeIn || "00:00:00"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["plate"]}>
                <span>Biển số xe vào</span>
                <p>{plateNumberIn || "***********"}</p>
              </div>
            </div>
            <div className={styles["img-info"]}>
              <div className={styles["img-face"]}>
                Ảnh chụp khuôn mặt
                <img
                  src={in_face_img}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className={styles["img-plate"]}>
                Ảnh chụp biển số
                <img
                  src={in_plate_img}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
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
              {/* add css */}
              <div className={styles["cam-message"]}>{cameraMessageOut}</div>
              {/* add css */}
            </div>

            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>
                <p>Mặt sau</p>
                <PlateCamera
                  videoRef={plateVideoRef_Out}
                  ref={plateCameraRef_Out}
                />
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>
                <p>Mặt trước</p>
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
                <p>Mặt sau</p>
                <div className={styles["content"]}>
                  <img
                    src={out_plate_img}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
              <div className={`${styles["in-picture-front"]} ${styles["cam"]}`}>
                <p>Mặt trước</p>
                <img
                  src={in_face_img}
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>
          {/* Vùng nhận diện thông tin */}
          <div className={styles["container-info"]}>
            <div className={styles["text-info"]}>
              <div className={styles["day-in"]}>
                <span>Ngày ra</span>
                {DateOut || "00/00/00"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["time-in"]}>
                <span>Giờ ra</span>
                {TimeOut || "00:00:00"}
              </div>
              <div className={styles["hori-line"]}></div>
              <div className={styles["plate"]}>
                <span>Biển số xe ra</span>
                <p>{plateNumberOut || "***********"}</p>
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
                  ""
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
                  ""
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
