import React from "react";
import styles from "../../../styles/user/mainScreen.module.css";

const MainScreen = ({
  in_id, // ID thẻ vào
  in_video_back, // Video quay mặt sau ở làn vào
  in_video_front, // Video quay mặt trước ở làn vào
  in_picture_back, // Ảnh chụp từ video quay mặt sau
  in_picture_front,  // Ảnh chụp từ video quay mặt trước
  in_face_img,  // Ảnh nhận diện khuôn mặt từ ảnh chụp
  in_plate_img, // Ảnh nhận diện biển số từ ảnh chụp
  in_plate_content, // Biển số sau khi nhận diện
  // Tương tự ở làn ra
  out_id,
  out_video_back,
  out_video_front, 
  out_picture_back, 
  out_picture_front, 
  out_face, 
  out_plate, 
  out_plate_content,
  // Trạng thái so sánh: Mời xe ra, Biển không khớp, Mặt không khớp
  status
}) => {
  return (
    <div className={styles["container"]}>
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
                  { '0000001' || out_id } 
                  <img src="/assets/dropdown.svg" alt="dropdown" />
                </button>
              </div>

              {/* Vùng quẹt thẻ */}
              <div className={styles["container-scan"]}>
                Quẹt thẻ
                <button className={styles["scan"]}>
                  <img src="/assets/scan.svg" alt="scan" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Vùng video quay */}
          <div className={styles["container-video-cam"]}>
            <p>Video Cam</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>Mặt sau
                {"Unconnect back camera" || in_video_back}
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>Mặt trước
                {"Unconnect back camera" || in_video_front}
              </div>
            </div>
          </div>

          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-picture-back"]} ${styles["cam"]}`}>Mặt sau
                {in_picture_back ? <img src={in_picture_back} alt="Mặt sau" /> : "No image"}
              </div>
              <div className={`${styles["in-picture-front"]} ${styles["cam"]}`}>Mặt trước
                {in_picture_front ? <img src={in_picture_front} alt="Mặt trước" /> : "No image"}
              </div>
            </div>
          </div>
        
          {/* Vùng nhận diện thông tin */}
          <div className={styles["container-info"]}>
            <div className={styles["text-info"]}>
              <div className={styles["day-in"]}>
                Ngày vào
                <p>14/05/2025</p>
              </div>

              <div className={styles["time-in"]}>
                Giờ vào
                <p>17/34/28</p>
              </div>

              <div className={styles["day-in"]}>
                Biển số xe vào
                <p>47-B2-722.38</p>
              </div>

            </div>
            <div className={styles["img-info"]}>
              <div className={styles["img-face"]}>Ảnh chụp khuôn mặt</div>
              <div className={styles["img-plate"]}>Ảnh chụp biển số</div>
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
                  { '0000001' || in_id } 
                  <img src="/assets/dropdown.svg" alt="dropdown" />
                </button>
              </div>

              {/* Vùng quẹt thẻ */}
              <div className={styles["container-scan"]}>
                Quẹt thẻ
                <button className={styles["scan"]}>
                  <img src="/assets/scan.svg" alt="scan" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Vùng video quay */}
          <div className={styles["container-video-cam"]}>
            <p>Video Cam</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-video-back"]} ${styles["cam"]}`}>Mặt sau
                {"Unconnect back camera" || in_video_back}
              </div>
              <div className={`${styles["in-video-front"]} ${styles["cam"]}`}>Mặt trước
                {"Unconnect back camera" || in_video_front}
              </div>
            </div>
          </div>

          {/* Vùng Ảnh chụp từ video */}
          <div className={styles["container-picture"]}>
            <p>Ảnh chụp</p>
            <div className={styles["content-cam"]}>
              <div className={`${styles["in-picture-back"]} ${styles["cam"]}`}>Mặt sau
                {in_picture_back ? <img src={in_picture_back} alt="Mặt sau" /> : "No image"}
              </div>
              <div className={`${styles["in-picture-front"]} ${styles["cam"]}`}>Mặt trước
                {in_picture_front ? <img src={in_picture_front} alt="Mặt trước" /> : "No image"}
              </div>
            </div>
          </div>

          {/* Vùng nhận diện thông tin */}
          <div className={styles["container-info"]}>
            <div className={styles["text-info"]}>
              <div className={styles["day-in"]}>
                Ngày ra
                <p>14/05/2025</p>
              </div>

              <div className={styles["time-in"]}>
                Giờ ra
                <p>17/34/28</p>
              </div>

              <div className={styles["day-in"]}>
                Biển số xe ra
                <p>47-B2-722.38</p>
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
      <div className={styles["status"]}>
        {"Mời xe ra" || status}
      </div>
    </div>
  )
}

export default MainScreen;