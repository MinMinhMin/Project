import styles from "../../../styles/user/mainScreen.module.css";
import React, { useRef, useState, useEffect } from "react";

import FaceCamera from "./FaceCamera";
import PlateCamera from "./PlateCamera";

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
  const faceVideoRef = useRef(null);
  const plateVideoRef = useRef(null);

  const faceCameraRef = useRef(null); // component handle (takeSnapshot)
  const plateCameraRef = useRef(null); // component handle (takeSnapshot)

  const [cameraMessage, setCameraMessage] = useState("");

  const [in_face_img, setInFaceImg] = useState(null);
  const [in_plate_img, setInPlateImg] = useState(null);

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

    startCamera(faceVideoRef, 1); // Face cam: built-in
    startCamera(plateVideoRef, 0); // Plate cam: external

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
      <div className={styles["status"]}>{"Mời xe ra" || status}</div>
    </div>
  );
};

export default MainScreen;
